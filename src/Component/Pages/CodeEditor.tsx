import React from "react";
import { Textarea } from "./Textarea";

const CodeEditor = ({ fileName, data, setData }) => {
//   const [data, setData] = useState(`\n`);

  // const codes = {
  //   html: "xml",
  //   php: "php",
  //   js: "javascript",
  //   jsx: "jsx",
  //   txt: "textile",
  //   xml: "xml",
  //   css: "css",
  //   c: "clike",
  //   cpp: "clike",
  //   java: "java",
  //   cs: "clike",
  //   py: "python",
  //   json: "javascript",
  // };

  // const handleKeyDown = (evt) => {
  //   let value ,
  //   // = content,
  //     selStartPos = evt.currentTarget.selectionStart;

  //   console.log(evt.currentTarget);

  //   if (evt.key === "Tab") {
  //     value =
  //       value.substring(0, selStartPos) +
  //       "    " +
  //       value.substring(selStartPos, value.length);
  //     evt.currentTarget.selectionStart = selStartPos + 3;
  //     evt.currentTarget.selectionEnd = selStartPos + 4;
  //     evt.preventDefault();

  //     setData(value);
  //   }
  // };

  return (
    <div className="row px-5 mt-3">
      <div className="col-md-12 mx-auto code-edit-container p-3">
      <Textarea
        name="test-textarea"
        value={data}
        onValueChange={(value: string) => setData(value)}
        numOfLines={1}
      />
       
        
      </div>
    </div>
  );
};

export default CodeEditor;