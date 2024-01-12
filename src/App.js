import { useRef, useState } from "react";
import "./styles.css";

// Problem
// We have an <input /> for files, files state are managed within our component
// For each file uploaded, an element with the file name is displayed, with an option to remove it
// The remove() operation removes file from files state
// If we upload file a.png, and then remove file a.png, and upload a.png again
// We will not see the a.png element reflected on the screen

export default function App() {
  const [files, setFiles] = useState();
  const inputRef = useRef();

  const onChange = (evt) => {
    setFiles(Object.entries(evt.target.files).map(([_, b]) => b));
  };

  const onRemove = (fileName) => {
    let copy = [...files];
    copy = copy.filter(({ name }) => name !== fileName);
    setFiles(copy);
  };

  const onClick = () => {
    if (inputRef.current) {
      // value is always ""
      console.log(inputRef.current.value);
    }
  };

  return (
    <div className="App">
      <input
        ref={inputRef}
        // here input is controlled, but we don't have a reactive value for its state
        // therefore, input onChanges value remains "" after renders
        // which means we can upload same file twice
        value=""
        onChange={onChange}
        type="file"
        accept="image/jpeg,image/png,application/pdf"
        multiple
      />
      {files &&
        files.map((a, index) => {
          return (
            <div
              style={{
                display: "flex",
                columnGap: "18px",
                marginBottom: "12px"
              }}
            >
              <div key={index}>{a.name}</div>
              <button onClick={() => onRemove(a.name)}>Remove</button>
            </div>
          );
        })}

      <button onClick={onClick}>Click Me</button>
    </div>
  );
}
