import React from "react";
import {TreeItem} from "@mui/x-tree-view";
import {TreeNodeProps} from "./index";
import fsService from "../../services/items/fsService";
import {useQuery} from "react-query";

function FileTreeNode(props: TreeNodeProps) {
  const {name, path, owner, repository, setAction} = props;

  const fileContentQuery = useQuery(`get-file-${path}-content-`, () => handleOpenFile())

  function handleOpenFile() {
    return fsService.getFile({owner, repository, path})
      .then(res => {
        setAction(`file:${path}`)
      })
      .catch(err => {
        console.log("Error", err)
      })
  }

  return <TreeItem itemId={ "file:" + path} label={name} onClick={handleOpenFile}/>
}

export default FileTreeNode;