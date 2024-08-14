import React, {useState} from "react";
import {TreeItem} from "@mui/x-tree-view";
import {Box, CircularProgress} from "@mui/material";
import {TreeNodeProps} from "./index";
import fsService from "../../services/items/fsService";
import {FileSystemItem, FileSystemNode, NodeType} from "../../model/repository";
import {RenderNodePerType, treeNodeLabel} from "./fileSystemTree";

function DirectoryTreeNode(props: TreeNodeProps) {
  const {name, path, owner, repository, setAction} = props;
  const [nodes, setNodes] = useState<FileSystemNode<FileSystemItem[]> | null>(null);

  function handleClickDirectory() {
    fsService.getDirectory({owner, repository, path})
      .then(res => {
        setNodes(res)
      })
      .catch(err => {
      })
  }

  const loadingComp = <Box sx={{paddingLeft: "22px", paddingTop: "5px"}}>
    <CircularProgress size={10}/>
  </Box>

  return (
    <Box onClick={handleClickDirectory}>
      <TreeItem itemId={path} label={treeNodeLabel(name, NodeType.DIRECTORY)}>
        {!nodes ? loadingComp : (
          nodes.content?.map(item => RenderNodePerType(item, owner, repository, setAction))
        )}
      </TreeItem>
    </Box>

  )
}

export default DirectoryTreeNode;