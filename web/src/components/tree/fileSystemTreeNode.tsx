import React, {useEffect} from 'react';
// import {TreeItem} from "@mui/x-tree-view";
// import {useQuery} from "react-query";
// import fsService from "../../services/items/fsService";
// import {FileSystemItem, NodeType} from "../../model/repository";
// import {Box, CircularProgress} from "@mui/material";
//
//
// export interface FileSystemTreeNodeProps<F> {
//   name: string,
//   path: string,
//   owner: string,
//   repository: string
//   type: NodeType,
//   isFile: F
// }
//
// function FileSystemTreeNode<F extends boolean = true>(props: FileSystemTreeNodeProps<F>) {
//   const {owner, repository, name, path, type} = props
//   const [open, setOpen] = React.useState(false)
//   const
//   const node = useQuery(`fileSystemTreeNode::${path}::${type}`, () => {
//     return (props.type === NodeType.FILE ?
//       fsService.getFile({owner, repository, path}) :
//       fsService.getDirectory({owner, repository}))
//       .then(res => {
//         return res
//       })
//       .catch(err => {
//         console.log("Error", err)
//         return err
//       })
//   })
//
//   useEffect(() => {
//     if (node.data) {
//       setOpen(true)
//     }
//   }, [open])
//
//
//
//
//   return (
//     <TreeItem itemId={path} label={name} onClick={() => setOpen(o => !o)}>
//       <Box sx={{display:"flex", paddingLeft: "22px", paddingTop: "5px"}}>
//         <CircularProgress size={10}/>
//       </Box>
//     </TreeItem>
//   )
// }
//
// export default FileSystemTreeNode;