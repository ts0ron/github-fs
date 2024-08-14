import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {SimpleTreeView} from "@mui/x-tree-view/SimpleTreeView";
import {FileSystemItem, FileSystemNode, NodeType} from "../../model/repository";
import {UseQueryResult} from "react-query/types/react/types";
import {useQuery} from "react-query";
import fsService from "../../services/items/fsService";
import {CircularProgress, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import FileTreeNode from "./fileTreeNode";
import DirectoryTreeNode from "./directoryTreeNode";
import FileContentModal from "../modals/filecontent";


export const RenderNodePerType = (item: FileSystemItem, owner: string, repository: string, setAction: Dispatch<SetStateAction<string | null>>) => {
  const TreeNode = item.type === NodeType.FILE ? FileTreeNode : DirectoryTreeNode
  return <TreeNode key={item.path}
                   name={item.name}
                   path={item.path}
                   owner={owner}
                   setAction={setAction}
                   repository={repository}
                   type={item.type}/>
}


interface FileSystemTreeProps {
  owner: string,
  repository: string,
}

function FileSystemTree(props: FileSystemTreeProps) {
  const {owner, repository} = props;
  const [file, setFile] = useState<{
    content: string,
    name: string,
    open: boolean
  }>({open: false, content: "", name: ""})
  const [action, setAction] = React.useState<string | null>(null);


  let query: UseQueryResult<FileSystemNode<FileSystemItem[]>> = useQuery({
                                                                           queryKey: ["repositoryData"],
                                                                           queryFn: () =>
                                                                             fsService.getDirectory({
                                                                                                      owner,
                                                                                                      repository
                                                                                                    })
                                                                               .then((res) => {
                                                                                 return res
                                                                               })
                                                                               .catch(err => {
                                                                                 console.log("Error", err)
                                                                                 return err
                                                                               }),
                                                                         });

  useEffect(() => {

  }, [action])

  function handleModalClose() {
    setFile({open: false, content: "", name: ""})
  }

  const handleItemExpansionToggle = (
    event: React.SyntheticEvent,
    itemId: string,
    isExpanded: boolean,
  ) => {
    if (itemId.startsWith("file:")) {
      console.log("Are not we here ?")
      setAction(itemId);
    }
  };


  if (query.isLoading || !query.data) {
    return <CircularProgress/>
  }

  if (query.isError) {
    return <Typography>{"Something went wrong, please try again"}</Typography>
  }
  console.log("The open file", file)
  const rootDir = query.data

  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: "10px", width: "100%"}}>
      <Typography fontSize={36}>{rootDir.name}</Typography>
      <SimpleTreeView onItemExpansionToggle={handleItemExpansionToggle}
                      expansionTrigger="iconContainer">

        {rootDir.content?.map(item => RenderNodePerType(item, owner, repository, setAction))}
      </SimpleTreeView>
      {action &&
          <FileContentModal itemId={action}
                            onClose={() => setAction(null)}
                            owner={owner}
                            repository={repository}/>}

    </Box>)
}

export default FileSystemTree