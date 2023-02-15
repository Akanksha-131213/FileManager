import React, { useState } from "react";
import { useNavigate } from "react-router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  changeFolder,
  delFile,
  delFolder,
} from "../redux/action/filefolderCreator.js";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

function DisplayItem({ title, items, type }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [info, setInfo] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const { Folders, Files } = useSelector(
    (state) => ({
      Folders: state.filefolder.Folders.filter(
        (folder) => folder.data.parent === "root"
      ),
      Files: state.filefolder.Files.filter(
        (file) => file.data.parent === "root"
      ),
    }),
    shallowEqual
  );

  const handleDel = (type, id) => {
    if (type === "folder") {
      dispatch(delFolder(id));
      for (const i in Folders) {
        if (Folders[i].data.path.includes(id)) {
          console.log(Folders[i].data.name);
          dispatch(delFolder(Folders[i].docId));
        }
      }
      for (const i in Files) {
        if (Files[i].data.parent === id) {
          dispatch(delFolder(Files[i].docId));
        }
      }
    } else {
      dispatch(delFile(id));
    }
  };

  const handleInfo = (item) => {
    setInfo(item);
    setModalShow(true);
  };

  const handleDblClick = (itemId) => {
    if (type === "folder") {
      navigate(`/home/folder/${itemId}`);
      dispatch(changeFolder(itemId));
    } else {
      navigate(`/home/file/${itemId}`);
    }
  };

  return (
    <>
      <div className="flex justify-content-center m-auto">
        <div className="row gap-2 py-4 px-5 text-center fw-bold ">
          {items.map((item, index) => {
            return (
              <div
                className="col-2 card shadow"
                style={{ width: "150px", minHeight: "170px" }}
              >
                <div
                  key={index * 55}
                  className=" text-center mt-3  flex-column justify-content-center"
                  onDoubleClick={() => handleDblClick(item.docId)}
                >
                  {type === "folder" ? (
                    <div className="text-centers m-auto">
                      <img
                        src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/null/external-folder-web-flaticons-lineal-color-flat-icons-5.png"
                        alt=""
                        width="80"
                        height="*80"
                      />
                    </div>
                  ) : (
                    <div className="text-centers m-auto">
                      <img
                        src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-file-web-flaticons-lineal-color-flat-icons-7.png"
                        alt=""
                        width="90"
                        height="90"
                      />
                    </div>
                  )}

                  {item.data.name}
                </div>
                <span>
                  <button
                    className="btn align-self-start"
                    onClick={() => handleInfo(item)}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </button>
                  <button className="btn align-self-end">
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => handleDel(type, item.docId)}
                    />
                  </button>
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className=" text-center fw-bold justify-content-center m-auto">
        <Modal
          //size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={modalShow}
          onHide={() => setModalShow(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <p className="h4 m-auto"> Properties</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul className="list-group list-group-flush">
              <li className="list-group-item h6">
                Name:{" "}
                <span className="text-secondary"> {info?.data?.name}</span>
              </li>
              <li className="list-group-item h6 ">
                U-Id: <span className="text-secondary">{info?.docId}</span>
              </li>
              <li className="list-group-item h6">
                Parent:{" "}
                <span className="text-secondary">{info.data?.parent}</span>
              </li>
              <li className="list-group-item h6">
                Path:{" "}
                <span className="text-secondary">
                  root
                  {info.data?.path.map((i) => (i ? <p>/ {i}</p> : ""))}
                </span>
              </li>
            </ul>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default DisplayItem;
