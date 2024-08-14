import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {SimpleTreeView} from "@mui/x-tree-view/SimpleTreeView";
import {FileSystemItem, FileSystemNode, NodeType} from "../../model/repository";
import {UseQueryResult} from "react-query/types/react/types";
import {useQuery} from "react-query";
import fsService from "../../services/items/fsService";
import {CircularProgress, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import FileContentModal from "../modals/filecontent";
import IconsFactory from "../../icons/IconsFactory";
import DirectoryTreeNode from "./directoryTreeNode";
import FileTreeNode from "./fileTreeNode";


export function treeNodeLabel(name: string, type: NodeType) {
  return <Box
    sx={{display: "flex", alignItems: "center", gap: "10px"}}>
    {type === NodeType.FILE ?
      <IconsFactory.FileIcon.Text sx={{fontSize: 16}}/>
      : <IconsFactory.FileIcon.Folder sx={{fontSize: 16}}/>}
    {name}
  </Box>
}

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
                                                                                 return err
                                                                               }),
                                                                         });
  useEffect(() => {
    query.refetch()
  }, [owner, repository])

  const handleItemExpansionToggle = (
    event: React.SyntheticEvent,
    itemId: string,
    isExpanded: boolean,
  ) => {
    if (itemId.startsWith("file:")) {
      setAction(itemId);
    }
  };


  if (query.isLoading || !query.data) {
    return <CircularProgress/>
  }

  if (query.isError) {
    return <Typography>{"Something went wrong, please try again"}</Typography>
  }
  const rootDir = query.data

  function resolveFileName(action: string) {
    let fileName;
    if (action?.includes("/")) {
      const splitedAction = (action || "").split("/")
      fileName = splitedAction[splitedAction.length - 1]
    } else {
      fileName = (action || "").split(":")[1]
    }
    return fileName
  }

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      width: "100%",
      height: "10hv",
      justifyContent: "space-between"
    }}>
      <Typography fontSize={36}>{rootDir.name}</Typography>
      <SimpleTreeView onItemExpansionToggle={handleItemExpansionToggle}
                      expansionTrigger="iconContainer">

        {rootDir.content?.map(item => RenderNodePerType(item, owner, repository, setAction))}
      </SimpleTreeView>
      {action &&
          <FileContentModal itemId={action}
                            name={resolveFileName(action)}
                            onClose={() => setAction(null)}
                            owner={owner}
                            repository={repository}/>}

    </Box>)
}

export default FileSystemTree