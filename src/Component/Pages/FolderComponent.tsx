import React from 'react'
import { shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import DisplayItem from '../DisplayItem';

interface State{
  filefolder: any;
  text:"",
isLoading:true,
currentFolder:"root",
Folders:[],
Files:[]}

const FolderComponent = () => {
    const {folderId}=useParams();
    // eslint-disable-next-line 
    const {currentFolderData,childFolder,childFile}=useSelector(
      (state:State)=>({currentFolderData:state.filefolder.Folders.find(
        (folder: { docId: string; })=>folder.docId===folderId
        )?.data,
    childFolder:state.filefolder.Folders.filter(
      (folder: { data: { parent: string; }; })=>folder.data.parent===folderId
      ),
      childFile:state.filefolder.Files.filter(
        (file: { data: { parent: string; }; })=>file.data.parent===folderId
        ),
    }),
    shallowEqual);
  return (
  <div className=''>
    <div className='container'> 
      {childFolder?.length > 0?(
      <div>
      <DisplayItem title={"Folders"} type="folder" items={childFolder}/>
      <DisplayItem title={"Files"} type="files" items={childFile}/></div>
    ):( 

      childFile?.length > 0?(<div>
      <DisplayItem title={"Files"} type="files" items={childFile}/>

   
      
    </div>):(<div className='text-center m-auto '><h4>Empty Folder</h4></div>)
       )}

    </div></div>

  )
}

export default FolderComponent