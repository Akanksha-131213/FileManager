import React, { useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router'
import FileHeader from './FileHeader';
import CodeEditor from "./CodeEditor";

interface State{
  filefolder: any;
  text:"",
isLoading:true,
currentFolder:"root",
Folders:[],
Files:[]}

const FileComponent = () => {
  const navigate=useNavigate();
    const{fileId}=useParams();
    const [fileData, setFileData] = useState("");
    const [prevFileData, setPrevFileData] = useState("");

const{currentFile}=useSelector((state:State)=>({ 
     currentFile:state.filefolder.Files.find(
        (file)=>file.docId===fileId
     ),
}),shallowEqual)

const downloadFile = () => {
  const element = document.createElement("a");
  element.setAttribute("href", currentFile?.data?.url);
  element.setAttribute("download", currentFile?.data?.name);
  element.setAttribute("target", "_blank");
  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};


useEffect(() => {
    if (currentFile) {
      setFileData(currentFile?.data?.data);
      setPrevFileData(currentFile?.data?.data);
    }
  }, [currentFile, currentFile?.data?.data]);
return (

    <div >
{!currentFile.data.url?(<div className='card '><FileHeader fileName={currentFile?.data?.name}
              fileData={fileData}
              prevFileData={prevFileData}
              fileId={fileId}
            />
            <CodeEditor
              fileName={currentFile?.data?.name}
              data={fileData}
              setData={setFileData}
            /></div>):(<div className="position-fixed w-75 h-75 bg-dark text-white card m-5">
            {/* sub menu bar   */}
            <div className="d-flex py-4 mt-4 px-5 justify-content-between align-items-center">
              <p title={currentFile?.data?.name} className="my-0">
                {currentFile?.data?.name.length > 40
                  ? currentFile?.data?.name.slice(0, 40) +
                    "... ." +
                    currentFile?.data?.extension
                  : currentFile?.data?.name}
              </p>
              <div className="d-flex align-items-center me-5">
                <button
                  className="btn btn-sm btn-outline-light me-2"
                  onClick={() => navigate(-1)}
                >
                  Go Back
                </button>
                <button
                id="downloading"
                  className="btn btn-sm btn-primary"
                  onClick={() => downloadFile()}
                >
                  Download
                </button>
              </div>
            </div>
            <div className="w-100 h-75 m-auto" >
              {currentFile?.data?.extension.toLowerCase().includes("png") ||
              currentFile?.data?.extension.toLowerCase().includes("jpg") ||
              currentFile?.data?.extension.toLowerCase().includes("jpeg") ||
              currentFile?.data?.extension.toLowerCase().includes("gif") ? (
                <img
                  src={currentFile?.data?.url}
                  alt={currentFile?.data?.name}
                  className="w-100 h-100 img-fluid"
                />
              ) : (
                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                  <p className="text-center">
                    File type not supported. Please download the file to view
                    it.
                  </p>
                </div>
              )}
            </div>
          </div>
        )
}

        
            
            
            </div>
  )
}

export default FileComponent