import React, {useState} from "react";
import {TreeItem} from "@mui/x-tree-view";
import {Box, CircularProgress} from "@mui/material";
import {TreeNodeProps} from "./index";
import fsService from "../../services/items/fsService";
import {FileSystemItem, FileSystemNode} from "../../model/repository";
import {RenderNodePerType} from "./fileSystemTree";

function DirectoryTreeNode(props: TreeNodeProps) {
  const {name, path, owner, repository, setAction} = props;
  const [nodes, setNodes] = useState<FileSystemNode<FileSystemItem[]> | null>(null);
  console.log(`The owner ${owner} repo ${repository} and path: ${path}`)


  function handleClickDirectory() {
    fsService.getDirectory({owner, repository, path})
      .then(res => {
        setNodes(res)
      })
      .catch(err => {
        console.log("Error", err)
      })
  }

  console.log(`The node ${nodes}`)

  const loadingComp = <Box sx={{paddingLeft: "22px", paddingTop: "5px"}}>
    <CircularProgress size={10}/>
  </Box>

  return (
    <Box onClick={handleClickDirectory}>
      <TreeItem itemId={path} label={name}>
        {!nodes ? loadingComp : (
          nodes.content?.map(item => RenderNodePerType(item, owner, repository, setAction))
        )}

      </TreeItem>
    </Box>

  )
}

export default DirectoryTreeNode;