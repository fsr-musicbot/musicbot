"use client";
import { useDropzone } from "react-dropzone";

export default function Home() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  console.log(acceptedFiles);

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  );
}
