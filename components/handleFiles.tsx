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
    ? setLoadedFile((prevValue: any) => [
          ...prevValue,
        { fileObject: file, type: type ? type : fileExtension },
      ])
    : console.warn("Incorrect file type, please choose a correct file type.");
};

// A simulated fake fetch().
const convertFetch = (fileObject: any) => {
  const formData = new FormData();
  formData.append("firstName", "John");

  // Start of uploaded file Base64 conversion.

  const reader: any = new FileReader();

  // 'fileObject && ...' is to avoid code breaks when the user hits 'Submit' without uploading a file.
  fileObject && reader.readAsDataURL(fileObject); // Convert the file to a Base64 encoding.
  reader.onload = () => {
    const { result } = reader; // To remove the base64 header from the string, add 'result.split(",").pop()'.

    // End of uploaded file Base64 conversion.

    formData.append("file", result); // Switch 'result' to 'fileObject' if you need the unconverted file.
    console.log(formData.getAll("file"));
  };
  console.log(formData.getAll("firstName"));

  reader.onerror = () => {
    console.error("Failed to read file!");
  };

  URL.revokeObjectURL(fileObject); // Needed once the URL object isn't needed anymore. For cleanup purposes.
};

export { convertFetch };
export default handleFiles;
