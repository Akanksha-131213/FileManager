import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { uploadFile } from "../../redux/action/filefolderCreator.js";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";

interface State {
  filefolder: any;
  text: "";
  isLoading: true;
  currentFolder: "root";
  Folders: [];
  Files: [];
}

const UploadFile = ({ showModal3, setShowModal3 }) => {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const { Files, currentFolder, currentFolderData } = useSelector(
    (state: State) => ({
      Files: state.filefolder.Files,
      currentFolder: state.filefolder.currentFolder,
      currentFolderData: state.filefolder.Folders.find(
        (folder: { docId: any }) =>
          folder.docId === state.filefolder.currentFolder
      ),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      setFile("");
      setSuccess(false);
      setShowModal3(false);
    }
  }, [success]);

  const checkFileAlreadyPresent = (name: String) => {
    const filePresent = Files.filter(
      (file: { data: { parent: String } }) => file.data.parent === currentFolder
    ).find((fldr: { data: { name: String } }) => fldr.data.name === name);
    if (filePresent) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (file) {
      if (!checkFileAlreadyPresent(file.name)) {
        const data = {
          createdAt: new Date(),
          name: file.name,
          path:
            currentFolder === "root"
              ? []
              : [...currentFolderData?.data.path, currentFolder],
          parent: currentFolder,
          lastAccessed: null,
          updatedAt: new Date(),
          extension: file.name.split(".")[1],
          data: null,
          url: "",
        };
        setShowModal3(false);

        dispatch(uploadFile(file, data, success, setSuccess));
      } else {
        toast.info("File already present");
      }
    } else {
      toast.error("File name cannot be empty");
    }
  };

  return (
    <div>
      <div>
        <Modal show={showModal3} onHide={() => setShowModal3(false)}>
          <Modal.Header>
            <Modal.Title>Create File</Modal.Title>
            <Button
              id="closefile"
              variant="white"
              style={{ cursor: "pointer" }}
              onClick={() => setShowModal3(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <form className="mt-3 w-100" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-5 form-control"
              >
                Upload File
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default UploadFile;
