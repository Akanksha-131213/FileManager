import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload,faFolderPlus,faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Link, To, useNavigate } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { changeFolder } from '../redux/action/filefolderCreator';

interface State{
  filefolder: any;
  text:"",
isLoading:true,
currentFolder:"root",
Folders:[],
Files:[]}



function SubBar({setCreateFolderOpt,setCreateFileOpt,setUploadFileOpt}) {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const { currentFolder, Folders,currentFolderData } = useSelector(
    (state:State) => ({
      Folders: state.filefolder.Folders,
      currentFolder:state.filefolder.currentFolder,
      currentFolderData:state.filefolder.Folders.find((folder: { docId: String; })=>folder.docId===state.filefolder.currentFolder)}),
    shallowEqual
  );

  const handleNavigate=(link: To,id: string)=>{
    navigate(link);
    dispatch(changeFolder(id));
  }



  return (
    <div  className='bg-light border'>
       
        <nav aria-label="breadcrumb" className='ms-4'>
  <ol className="breadcrumb d-flex align-item-center">
{currentFolder!== "root"?(
  <><button onClick={()=>handleNavigate("/home","root")}
  className="breadcrumb-item btn btn-link text-docoration-none fw-bold">
Root
  </button>
  {currentFolderData?.data.path.map((folders,index)=>(
    <button key={index} className="breadcrumb-item btn btn-link fw-bold"
    onClick={()=>handleNavigate(
      `/home/folder/${
        Folders.find((folder)=>folders===folder.docId).docId
      }`,
      Folders.find((folder)=>folders===folder.docId).docId
    )}>
      {Folders.find((folder)=>folders===folder.docId).data.name}
    </button>
  )  )}
  <li className='breadcrumb-item btn active fw-bold'>
{currentFolderData?.data.name} 
  </li>
  </>
):(

  <li className="breadcrumb-item fw-bold"><Link to="/home">Root</Link></li>
)}
    
    
  </ol>
</nav>



<nav className='navbar navbar-expand-lg navbar-light mt-1 bg-light  border'>
<ul className='navbar-nav ms-auto'>
    <li className='nav-item me-3'>
        <button className='btn btn-outline-dark shadow-sm ' onClick={()=>setUploadFileOpt(true)}>
        <FontAwesomeIcon icon={faFileUpload}/> Upload File
        </button>
    </li>
    <li className='nav-item me-3'>
        <button className='btn btn-outline-dark' onClick={()=>setCreateFileOpt(true)}>
        <FontAwesomeIcon icon={faFileCirclePlus} /> Create File
        </button>
    </li> 
    <li className='nav-item me-3'>
        <button className='btn btn-outline-dark' onClick={()=>setCreateFolderOpt(true)}>
        <FontAwesomeIcon icon={faFolderPlus}/> Create Folder
        </button>
    </li>
</ul></nav>
    </div>
  )
}

export default SubBar

