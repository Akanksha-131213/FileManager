import * as types from "../actionType/filefolderActionType";
import fire from "../../config/firebase"
//actions

const addFolder=(payload)=>({
    type: types.CREATE_FOLDER,
    payload
})
const addFolders=(payload)=>({
    type: types.ADD_FOLDER,
    payload
})

const setLoading=(payload)=>({
type:types.SET_LOADING,
payload,
})

const setChangeFolder=(payload)=>({
    type:types.CHANGE_FOLDER,
    payload
})
const addFile=(payload)=>({
    type:types.ADD_FILES,
    payload
})
//s
const addFiles=(payload)=>({
    type:types.CREATE_FILE,
    payload
})

const deleteFile=(payload)=>({
    type:types.DELETE_FILE,
    payload
})
const setFileData = (payload) => ({
    type: types.SET_FILE_DATA,
    payload,
  });


//action creater
export const searchBar = text => dispatch => {
    dispatch({
      type: types.SEARCHBAR,
      payload: text
    });
  };

export const createFolder = (data)=>(dispatch)=>{
    fire.firestore().collection("Folder").add(data).then(async(folder)=>{
        const folderData=await (await folder.get()).data();
        const folderId=folder.id;

        dispatch(addFolder({data:folderData,docId:folderId}))
        alert("folder created successfully")
    }

    )
}

export const getFolders=()=>(dispatch)=>{
    dispatch(setLoading(true));
    fire
    .firestore()
    .collection("Folder")
    .get()
    .then(async(folders)=>{
        const foldersData=await folders.docs.map((folder)=>({
      data:folder.data(),
        docId: folder.id,}));
         dispatch(setLoading(false));
        dispatch(addFolders(foldersData));
       
    });
}
export const changeFolder=(folderId)=>(dispatch)=>{
    dispatch(setChangeFolder(folderId));
}
export const getFiles=()=>(dispatch)=>{
    fire
    .firestore()
    .collection("files")
    .get()
    .then(async(files)=>{
        const filesData=await files.docs.map((file)=>({
      data:file.data(),
        docId: file.id,}));
        dispatch(addFiles(filesData));
       
    });
}

export const createFile=(data)=>(dispatch)=>{
console.log(data);
fire.firestore().collection("files").add(data).then(async(file)=>{
    const fileData=await (await file.get()).data();
    const fileId=file.id;
    alert("created sucessfully");
    dispatch(addFile({data:fileData,docId:fileId}))

})
}
export const delFile=(id)=>(dispatch)=>{
    console.log(id);
    fire.firestore().collection("files").doc(id).delete().then(
        
        
        alert("File deleted"),
        dispatch(getFiles())
        )



}
export const delFolder=(id)=>(dispatch)=>{
    console.log(id);
    fire.firestore().collection("Folder").doc(id).delete().then(
        
        
        alert("Folder deleted"),
        dispatch(getFolders())
        )



}
export const updateFileData = (fileId, data) => (dispatch) => {
    fire
      .firestore()
      .collection("files")
      .doc(fileId)
      .update({ data })
      .then(() => {
        dispatch(setFileData({ fileId, data }));
        alert("File saved successfully!");
      })
      .catch(() => {
        alert("Something went wrong!");
      });
  };

