export async function openAudioFile() {
  // Open file picker and destructure the result the first handle
  const [fileHandle] = await window.showOpenFilePicker({
    types: [
      {
        description: "Audio",
        accept: {
          "audio/*": [".mp3", ".wav"],
        },
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
  });
  const file = await fileHandle.getFile();
  console.log({ fileHandle });
  return file;
}
``;
