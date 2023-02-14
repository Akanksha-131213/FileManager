import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router'
import {updateFileData} from "../../redux/action/filefolderCreator.js";
const FileHeader = ({ fileName, fileId, fileData, prevFileData}) => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
  return (
    <nav className="navbar navbar-expand-lg mt-1 navbar-light bg-white shadow-sm">
    <p className="navbar-brand my-0 fw-bold ms-5">{fileName}</p>
    {fileData !== prevFileData && (
      <h5 className="my-0 fw-bold ms-2 text-danger">---changed</h5>
    )}

    <ul className="navbar-nav ms-auto me-5">
      <li className="nav-item mx-2">
        <button
          className=""
          disabled={fileData === prevFileData}
          onClick={() => {
            dispatch(updateFileData(fileId, fileData));
          } }
        >
       <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/null/external-save-web-flaticons-lineal-color-flat-icons-4.png"
           alt='' height={40} width={40}/></button>
      </li>
      <li className="nav-item">
      <button className='' onClick={()=>navigate(-1)}>
            <img src="https://img.icons8.com/color/48/null/close-window.png"
            alt='' height={40} width={40}/></button>
      </li>
    </ul>
  </nav>


   
  )
}

export default FileHeader