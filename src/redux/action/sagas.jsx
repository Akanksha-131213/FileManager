import {  put ,call, takeEvery,delay} from "redux-saga/effects";
import {setLoading,addFolders,addFiles, setChangeFolder, deleteFile, deleteFolder, addFolder, addFile, setFileData} from "./filefolderCreator";
import fire from "../../config/firebase";
import * as types from "../actionType/filefolderActionType";
import { toast } from "react-toastify";
const getfolderapi=()=>{
    return( fire
    .firestore()
    .collection("Folder")
    .get()
    .then(async(folders)=>{
         const foldersData=folders.docs.map((folder) => ({
             data: folder.data(),
             docId: folder.id,
         }));
       return(foldersData)
    }))
    

}
const getfileapi=()=>{
    return(
        fire
        .firestore()
        .collection("files")
        .get()
        .then(async (files) => {
          const filesData = files.docs.map((file) => ({
              data: file.data(),
              docId: file.id,
          }));
          return (filesData)
          
        })
    )
}

const getcreateFileapi=(data)=>{
    return (fire
    .firestore()
    .collection("files")
    .add(data)
    .then(async (file) => {
      const fileData = await (await file.get()).data();
      const fileId = file.id;
      return {fileData,fileId}
    //   toast.success("created sucessfully");
    //   dispatch(addFile({ data: fileData, docId: fileId }));
    }));
}

const getCreateFolderapi=(data)=>{
    return (fire
    .firestore()
    .collection("Folder")
    .add(data)
    .then(async (folder) => {
      const folderData = await (await folder.get()).data();
      const folderId = folder.id;
      return ({folderData,folderId})
 
    }));
    

}
const getDelFileapi=(id)=>{
  

    return (  fire
    .firestore()
    .collection("files")
    .doc(id)
    .delete()
    .then(toast.success("File deleted")));
    
}

const getDelFolderapi=(id)=>{
  

    return (  fire
    .firestore()
    .collection("Folder")
    .doc(id)
    .delete()
    .then(toast.success("Folder deleted")));
    
}
const updateFileDataapi=(fileId,data)=>{
   return( fire
    .firestore()
    .collection("files")
    .doc(fileId)
    .update({ data })
    .then(() => {
      //dispatch(setFileData({ fileId, data }));
      toast.success("File saved successfully!");
    })
    .catch(() => {
      toast.error("Something went wrong!");
    }));
}




function* getFiles(){
    try{
        const filesData=yield call (getfileapi)
        
       yield put (addFiles(filesData));
    }
    catch(e){
        console.log("fetch files not working.")
    }
}

function* getFolders(){
try{
        yield put (setLoading(true));

      const foldersData= yield call (getfolderapi)
    
        yield put(setLoading(false));
       yield put (addFolders(foldersData));
  
}catch(e){
    console.log("fetch not working");
}     
   
}
function* changeFolder({payload:folderId}){
    try{
        console.log(folderId);
        yield put (setChangeFolder(folderId));
    }catch(e){
        console.log("change folder is not working.")
    }
}

function* delFile({payload:id}){
    try{
    yield call (()=>getDelFileapi(id));

   yield put (deleteFile());
    }catch(e){
        console.log("delFile has problem",e)
    }
}
function* delFolder({payload:id}){
    try{
    yield call (()=>getDelFolderapi(id));

   yield put (deleteFolder());
    }catch(e){
        console.log("delFolder has problem",e)
    }

}
function* createFolder({payload:data}){
    try{
    const {folderData,folderId}=yield call (()=>getCreateFolderapi(data));
    yield put(addFolder({ data: folderData, docId: folderId }));
    toast.success("folder created successfully");

    }catch(e){
        console.log("createFolder has problem : ",e)
    }

}

function* createFile({payload:data}){
    try{
        const {fileData,fileId}=yield call (()=>getcreateFileapi(data));
        yield put(addFile({ data: fileData, docId: fileId }));
        toast.success("file created successfully");
    
        }catch(e){
            console.log("createFile has problem : ",e)
        }

}

function* updateFileData({payload : {fileId,data}}){
try{
    yield call (()=>updateFileDataapi(fileId,data))
    yield put (setFileData({ fileId, data }))
}catch (e){}
}
const uploadFileapi= (data)=>{
    
    return (fire
        .firestore()
        .collection("files")
        .add(data)
        .then(async (file) => {
          const fileData = (await file.get()).data();
          const fileId = file.id;
          return {fileData,fileId}
        //   toast.success("created sucessfully");
        //   dispatch(addFile({ data: fileData, docId: fileId }));
        })
        );
        
    }
   
 function* uploadFile({payload:{file, data}}){
  
   try{  

    toast.info("uploading...")
    const uploadFileRef = fire.storage().ref(`files/${data.name}`);
    yield call (()=>{uploadFileRef.put(file).on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
  
        console.log("uploading " + prog + "%");
      },
      (error) => {
        toast.error(error);
      })})
    
      const fullData =yield call (
      async () => { 
        console.log("inside");
        const fileUrl = await uploadFileRef.getDownloadURL();
        console.log("inside 2",fileUrl);
        const fullData = { ...data, url: fileUrl };
        return fullData;
    });
    console.log(fullData);
      const {fileData,fileId} =yield  call (uploadFileapi,fullData)
      toast.success("Uploaded Successfully")
      yield put (addFile({ data:fileData, docId: fileId }))
  
    }
     
    catch (e){
        console.log(e)
      
    }

}


export function* sagas(){
    yield takeEvery(types.FETCH_FOLDER,getFolders)
    yield takeEvery(types.FETCH_FILES,getFiles)
    yield takeEvery(types.CHANGE_FOLDER_SAGA,changeFolder)
    yield takeEvery(types.DELETE_FILE_SAGA,delFile)
    yield takeEvery(types.DELETE_FOLDER_SAGA,delFolder)
    yield takeEvery(types.CREATE_FOLDER_SAGA,createFolder)
    yield takeEvery(types.CREATE_FILE_SAGA,createFile)
    yield takeEvery(types.UPDATE_FILE_DATA,updateFileData)
    yield takeEvery(types.UPLOAD_FILE,uploadFile)
}

