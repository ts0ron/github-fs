import React, {useEffect} from 'react'
import Box from "@mui/material/Box";
import {Button, ClickAwayListener, Modal, TextareaAutosize, Typography} from "@mui/material";
import fsService from "../../../services/items/fsService";
import {grey} from "@mui/material/colors";
import useLazyQuery from "../../../hooks/useLazyQuery";

interface FileContentModalProps {
  name: string,
  itemId: string,
  onClose: () => void,
  owner: string,
  repository: string
}

interface ModalHeaderProps {
  name: string
}

function ModalHeader(props: ModalHeaderProps) {
  const {name} = props
  return <Box sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#424242",
    borderTopLeftRadius: "6px",
    borderTopRightRadius: "6px",
    height: "64px",
    paddingLeft: "20px",
  }}>
    <Box sx={{display: "flex", width: "200px", flexWrap: "nowrap"}}>
      <Typography color={grey[200]}
                  sx={{width: "200px", maxHeight: "40px", flexWrap: "nowrap", textOverflow: "ellipsis"}}>
        {name}
      </Typography>
    </Box>
  </Box>
}

interface ModalFooterProps {
  onClose: () => void
}

function ModalFooter(props: ModalFooterProps) {
  const {onClose} = props;
  return <Box sx={{
    backgroundColor: "#424242",
    borderBottomRightRadius: "6px",
    borderBottomLeftRadius: "6px",
    height: "64px",
    display: "flex",
  }}>
    <Button onClick={onClose}></Button>
  </Box>
}

function FileContentModal(props: FileContentModalProps) {
  const {itemId, onClose, owner, name, repository} = props;
  const [file, setFile] = React.useState<string | null>(null)

  const [fetch]= useLazyQuery(`file-content-${itemId}`, () =>
    fsService.getFile({owner: owner, repository: repository, path: itemId.slice(5)})
      .then(res => {
        setFile(res)
      })
  )

  useEffect(() => {
    if (itemId.startsWith("file:")) {
      fetch()
    }
  }, [owner, repository, itemId]);

  return (
    <ClickAwayListener onClickAway={onClose}>
      <Modal open={(!!file || file === "") && itemId.startsWith("file:")}
             onClose={onClose}
             slotProps={{
               backdrop: {
                 style: {
                   backgroundColor: "rgba(0, 0, 0, 0.5)"
                 }
               }
             }}
      >
        <Box sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          position: "absolute",
          top: "0",
          left: "0",
          pointerEvents: "none"
        }}>
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
            <ModalHeader name={name}/>
            <Box sx={{
              display: "flex",
              justifyContent: "center",
              overflowY: "scroll",
              height: "370px",
              maxWidth: "570px",
              p: "20px"
            }}>
              <TextareaAutosize style={{width: "580px", resize: "vertical", overflow: "auto"}} minRows={23} maxRows={23}
                                value={atob(file || "")}/>
            </Box>
            <ModalFooter onClose={onClose}/>
          </Box>
        </Box>

      </Modal>
    </ClickAwayListener>
  )
}

export default FileContentModal;