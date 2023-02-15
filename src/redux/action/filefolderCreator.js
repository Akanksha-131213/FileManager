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

export const createFile = (data) => {
  return { type: types.CREATE_FILE_SAGA, payload: data };
};
export const delFile = (id) => {
  return { type: types.DELETE_FILE_SAGA, payload: id };
};
export const delFolder = (id) => {
  return { type: types.DELETE_FOLDER_SAGA, payload: id };
};
export const updateFileData = (fileId, data) => {
  return { type: types.UPDATE_FILE_DATA, payload: { fileId, data } };
};

export const uploadFile = (file, data, setSuccess) => {
  return { type: types.UPLOAD_FILE, payload: { file, data, setSuccess } };
};
