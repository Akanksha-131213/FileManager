import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import DisplayItem from "./DisplayItem";

interface State {
  filefolder: any;
  text: "";
  isLoading: true;
  currentFolder: "root";
  Folders: [];
  Files: [];
}

export const Dashboard = () => {
  // const folders =["new folder","new folder 2"];
  //const files =[ {name:"new f1"}, {name:"new f2"}];
  const { isLoading, Folders, Files } = useSelector(
    (state: State) => ({
      isLoading: state.filefolder.isLoading,
      Folders: state.filefolder.Folders.filter(
        (folder: { data: { parent: string } }) => folder.data.parent === "root"
      ),
      Files: state.filefolder.Files.filter(
        (file: { data: { parent: string } }) => file.data.parent === "root"
      ),
    }),
    shallowEqual
  );
  return (
    <div className="">
      <div className="container">
        {isLoading ? (
          <h1> Wait....</h1>
        ) : (
          <div>
            <DisplayItem title={"Folders"} type="folder" items={Folders} />
            <DisplayItem title={"files"} type="files" items={Files} />
          </div>
        )}
      </div>
    </div>
  );
};
