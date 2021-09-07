// Allowed image file types.
export const imageTypes = [
  "image/png",
  "image/svg+xml",
  "image/jpeg",
  "image/gif",
  "image/bmp",
];

export const docTypes = ["application/pdf"];

const handleFiles = (file: any, setLoadedFile: any) => {
  const { type } = file; // Add "const { name, size, type } = file"; if you need the filename or filesize.
  const blob = new Blob([file], { type: type });
  const blobURL = URL.createObjectURL(blob);

  if (imageTypes.includes(type) || docTypes.includes(type)) {
    setLoadedFile({
      type: type,
      data: blobURL,
    });
  } else {
    console.warn("Incorrect file type, please choose a correct file type.");
  }
};

//  Add 'URL.revokeObjectURL(blobURL);' at a stage when the object isn't needed anymore.

export default handleFiles;