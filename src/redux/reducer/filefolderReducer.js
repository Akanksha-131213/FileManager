import * as types from "../actionType/filefolderActionType";

const initialState = {
  text: "",
  isLoading: true,
  currentFolder: "root",
  Folders: [],
  Files: [],
};

const filefolderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_FOLDER:
      return {
        ...state,
        Folders: [...state.Folders, action.payload],
      };
    case types.ADD_FOLDER:
      return {
        ...state,
        Folders: action.payload,
      };
    case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case types.CHANGE_FOLDER:
      return {
        ...state,
        currentFolder: action.payload,
      };
    case types.ADD_FILES:
      return {
        ...state,
        Files: [...state.Files, action.payload],
      };
    case types.CREATE_FILE:
      return {
        ...state,
        Files: action.payload,
      };
    // case types.DELETE_FILE:
    //   return {
    //     ...state,
    //     Files: state.Files.filter((file) => file.data.name !== action.payload),
    //   };
    // case types.SEARCHBAR:
    //   return {
    //     ...state,
    //     text: action.payload,
    //     loading: false,
    //   };
    case types.SET_FILE_DATA:
      const { fileId, data } = action.payload;
      const allFiles = state.Files;
      const currentFile = allFiles.find((file) => file.docId === fileId);
      currentFile.data.data = data;
      return {
        ...state,
        Files: state.Files.map((file) =>
          file.docId === fileId ? currentFile : file
        ),
      };

    default:
      return state;
  }
};

export default filefolderReducer;
