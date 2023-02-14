import React, { useState } from 'react'
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { createFolder } from '../../redux/action/filefolderCreator';
import {toast} from "react-toastify"

const CreateFolder = ({showModal,setShowModal}) => {

  const { currentFolder, Folders,currentFolderData } = useSelector(
    (state) => ({
      Folders: state.filefolder.Folders,
      currentFolder:state.filefolder.currentFolder,
      currentFolderData:state.filefolder.Folders.find((folder)=>folder.docId===state.filefolder.currentFolder)}),
    shallowEqual
  );

    
      const dispatch=useDispatch();
      const checkFolderAlreadyPresent=(name)=>{
        if (currentFolder==="root"){
        const FolderPresent=Folders.find((folder)=>folder.data.name===name);
      if (FolderPresent)
      return true;
      else return false;
    
    }else{
      const FolderPresent=Folders
      .filter(
        (folder)=>folder.data.parent===currentFolder)
      .find((folder)=>
      folder.data.name===name&& folder.data.parent===currentFolder);
      if (FolderPresent)
      return true;
      else return false;
    }
  }
    


    
    const [folderName, setFolderName] = useState("");
     const handleFolderSubmit=(e)=>{
        e.preventDefault();
        if(folderName){
            if (checkFolderAlreadyPresent(folderName)){
                toast.info("Folder already present.")
            }
            else{
                const data={
              
                  name:folderName,
                  createdAt:new Date(),
                  path:
                  currentFolder ==="root"
                  ?[]:[...currentFolderData?.data.path,currentFolder],
                  parent:currentFolder,
                  lastAccess:null,
                  updatedAt:new Date(),
                }
                console.log(data);
                
                dispatch(createFolder(data));
                document.getElementById("closefolder").click();

            }


        }else{
            toast.error('folder  name cannot be empty.')
        }

    }
  return (
    <div><>
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header>
        <Modal.Title>Create Folder</Modal.Title>
        <Button
        id ="closefolder"
          variant="white"
          style={{ cursor: "pointer" }}
          onClick={() => setShowModal(false)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFolderSubmit}>
          <Form.Group controlId="formBasicFolderName" className="my-2">
            <Form.Control
              type="text"
              placeholder="Enter folder name..."
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicFolderSubmit" className="mt-5">
            <Button type="submit" className="form-control" variant="primary">
              Add Folder
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
    {/* <Button
    //   onClick={() => setShowModal(true)}
      variant="outline-dark"
      className="border-1 d-flex align-items-center justify-content-between rounded-2"
    >
      <FontAwesomeIcon icon={faFolderPlus} />
      &nbsp; Create Folder
    </Button> */}
  </></div>
  )
}

export default CreateFolder
//   <div className='col-md-12 positionfixed top-0 left-0 w-100 h-100'>
// style={{background :"rgba(0,0,0,0.4"}}
// <div