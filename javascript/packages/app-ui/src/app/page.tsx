"use client";
import Dropzone from "react-dropzone";

export default function Home() {
  const handleSubmitAudio = async (acceptedFiles: File[]) => {
    console.log(acceptedFiles[0]);

    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);

    reader.onload = async function () {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reader.result),
      });
      console.log(response);

      if (response) {
        console.log(await response.json());
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Here, you can make your API request with the base64String if needed
      // For now, I'm just logging it for demonstration purposes.
    };
  };

  return (
    <section className="container">
      <Dropzone onDrop={(acceptedFiles) => handleSubmitAudio(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag and drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
    </section>
  );
}
