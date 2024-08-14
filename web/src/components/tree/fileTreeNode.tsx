import React from "react";
import {TreeItem} from "@mui/x-tree-view";
import {TreeNodeProps} from "./index";
import {treeNodeLabel} from "./fileSystemTree";
import {NodeType} from "../../model/repository";

function FileTreeNode(props: TreeNodeProps) {
  const {name, path, owner, repository, setAction} = props;

  function handleOpenFile() {
    setAction(`file:${path}`)
  }

  return <TreeItem itemId={"file:" + path} label={treeNodeLabel(name, NodeType.FILE)} onClick={handleOpenFile}/>
}

export default FileTreeNode;