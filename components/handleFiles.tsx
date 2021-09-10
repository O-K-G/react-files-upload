// Allowed file types.
export const fileTypes = {
  imageFiles: [
    "image/png",
    "image/svg+xml",
    "image/jpeg",
    "image/gif",
    "image/bmp",
    "image/webp",
  ],
  documentFiles: ["application/pdf", "text/plain"],

  // unsupportedFiles: Either image or document files that aren't natively supported for display by main browsers.
  unsupportedFiles: ["tif", "doc", "docx", "odt", "rtf"],
};

const handleFiles = (file: any, setLoadedFile: any) => {
  const { name, type } = file;
  const { imageFiles, documentFiles, unsupportedFiles } = fileTypes;
  const fileExtension = name.split(".").pop().toLowerCase(); // Used to identify unsupported file extensions.

  imageFiles.includes(type) ||
  documentFiles.includes(type) ||
  unsupportedFiles.includes(fileExtension)
    ? setLoadedFile({
        fileObject: file,
        type: type ? type : fileExtension,
      })
    : console.warn("Incorrect file type, please choose a correct file type.");
};

export default handleFiles;
