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
  documentFiles: ["application/pdf"],

  // unsupportedFiles: Either image or document files that aren't natively supported for display by main browsers.
  unsupportedFiles: ["tif", "TIF", "doc", "DOC", "docx", "DOCX", "odt", "ODT"],
};

const handleFiles = (file: any, setLoadedFile: any) => {
  const { name, type } = file; // Add "const { name, size, type } = file"; if you need the filesize.
  const blob = new Blob([file], { type: type });
  const { imageFiles, documentFiles, unsupportedFiles } = fileTypes;
  const fileExtension = name.split(".").pop(); // Used for unsupported file extensions.

  // Start of Base64 converstion.
  const reader: any = new FileReader();
  reader.readAsDataURL(file); // Convert the file to a Base64 encoding.
  reader.onload = () => {
    const { result } = reader;
    // End of Base64 converstion.

    imageFiles.includes(type) ||
    documentFiles.includes(type) ||
    unsupportedFiles.includes(fileExtension)
      ? setLoadedFile({
          name: name,
          type: type ? type : fileExtension,
          blob: blob,
          base64String: result.split(",").pop(), // Removes the base64 header.
        })
      : console.warn("Incorrect file type, please choose a correct file type.");
  };
};

export default handleFiles;
