import * as types from "../actionType/filefolderActionType";
import fire from "../../config/firebase";

import { toast } from "react-toastify";

//actions

export const addFolder = (payload) => ({
  type: types.CREATE_FOLDER,
  payload,
});
export const addFolders = (payload) => ({
  type: types.ADD_FOLDER,
  payload,
});

export const setLoading = (payload) => ({
  type: types.SET_LOADING,
  payload,
});

export const setChangeFolder = (payload) => ({
  type: types.CHANGE_FOLDER,
  payload,
});
export const addFile = (payload) => ({
  type: types.ADD_FILES,
  payload,
});
//s
export const addFiles = (payload) => ({
  type: types.CREATE_FILE,
  payload,
});

export const deleteFile = () => ({
  type: types.FETCH_FILES,
});
export const deleteFolder = () => ({
  type: types.FETCH_FOLDER,
});
export const setFileData = (payload) => ({
  type: types.SET_FILE_DATA,
  payload,
});

//action creater
export const createFolder = (data) => {
  return { type: types.CREATE_FOLDER_SAGA, payload: data };
};

export const getFolders = () => {
  return { type: types.FETCH_FOLDER };
};
export const changeFolder = (folderId) => {
  return { type: types.CHANGE_FOLDER_SAGA, payload: folderId };
};

export const getFiles = () => {
  return { type: types.FETCH_FILES };
};

export const createFile = (data) => (dispatch) => {
  console.log(data);
  fire
    .firestore()
    .collection("files")
    .add(data)
    .then(async (file) => {
      const fileData = await (await file.get()).data();
      const fileId = file.id;
      toast.success("created sucessfully");
      dispatch(addFile({ data: fileData, docId: fileId }));
    });
};
export const delFile = (id) => {
  return { type: types.DELETE_FILE_SAGA, payload: id };
};
export const delFolder = (id) => {
  return { type: types.DELETE_FOLDER_SAGA, payload: id };
};
export const updateFileData = (fileId, data) => (dispatch) => {
  fire
    .firestore()
    .collection("files")
    .doc(fileId)
    .update({ data })
    .then(() => {
      dispatch(setFileData({ fileId, data }));
      toast.success("File saved successfully!");
    })
    .catch(() => {
      toast.error("Something went wrong!");
    });
};

export const uploadFile = (file, data, setSuccess) => (dispatch) => {
  toast.info("uploading...");
  const uploadFileRef = fire.storage().ref(`files/${data.name}`);

  uploadFileRef.put(file).on(
    "state_changed",
    (snapshot) => {
      const prog = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      console.log("uploading " + prog + "%");
    },
    (error) => {
      toast.error(error);
    },
    async () => {
      const fileUrl = await uploadFileRef.getDownloadURL();
      const fullData = { ...data, url: fileUrl };

      fire
        .firestore()
        .collection("files")
        .add(fullData)
        .then(async (file) => {
          const fileData = await (await file.get()).data();
          const fileId = file.id;
          dispatch(addFile({ data: fileData, docId: fileId }));
          toast.success("File uploaded successfully!");
          setSuccess(true);
        })
        .catch(() => {
          setSuccess(false);
        });
    }
  );
};
