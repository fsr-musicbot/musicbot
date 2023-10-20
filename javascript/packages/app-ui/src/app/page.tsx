"use client";
import Dropzone from "react-dropzone";

export default function Home() {
  return (
    <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()} className="h-10 bg-neutral-100 cursor-pointer">
          <input {...getInputProps()} />
          <p>Add audio file, or click to select files</p>
        </div>
      )}
    </Dropzone>
  );
}
