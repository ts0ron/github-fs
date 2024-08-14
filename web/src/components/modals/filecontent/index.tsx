import React, {useEffect} from 'react'
import Box from "@mui/material/Box";
import {Button, ClickAwayListener, Modal, Typography} from "@mui/material";
import fsService from "../../../services/items/fsService";


interface FileContentModalProps {
  itemId: string,
  onClose: () => void,
  owner: string,
  repository: string
}

function FileContentModal(props: FileContentModalProps) {
  const {itemId, onClose} = props;
  const [file, setFile] = React.useState<string | null>(null)
  const [name, setName] = React.useState<string | null>(null)


  useEffect(() => {
    if (itemId.startsWith("file:")) {
      fsService.getFile({owner: props.owner, repository: props.repository, path: itemId.slice(5)})
        .then(res => {
          console.log("The content and name", res.content, res.name)
          setFile(res.content)
          setName(res.name)
        })
    }
  }, [itemId]);

  return (
    <ClickAwayListener onClickAway={onClose}>
      <Modal sx={{width: "500px", height: "400px"}} open={!!file && itemId.startsWith("file:")} onClose={onClose}>
        <Box sx={{display: "flex", height: "100%", justifyContent: "center", alignItems: "center"}}>
          <Box sx={{
            alignSelf: "center",
            display: "flex",
            width: "600px",
            height: "500px",
            backgroundColor: "#F0F0F0",
            borderRadius: "6px",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
            <Box sx={{
              diplay: "flex",
              justifyContent: "left",
              backgroundColor: "#424242",
              borderTopLeftRadius: "6px",
              borderTopRightRadius: "6px",
              height: "64px"
            }}>
              <Typography color={"red"}>
                {name}
              </Typography>
            </Box>
            {file || ""}
            <Box sx={{
              backgroundColor: "#424242",
              borderBottomRightRadius: "6px",
              borderBottomLeftRadius: "6px",
              height: "64px",
              display: "flex",
              paddingBottom: "100px",
            }}>
              <Button onClick={onClose}></Button>
            </Box>
          </Box>
        </Box>

      </Modal>
    </ClickAwayListener>
  )
}

export default FileContentModal;