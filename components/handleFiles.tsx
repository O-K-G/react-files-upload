const handleFiles = (file: any, setLoadedFile: any) => {
  const reader: any = new FileReader();
  const { type } = file; // Add "const { name, size, type } = file"; if you need the filename or filesize.

  // If the files are image files.
  if (
    type === "image/png" ||
    type === "image/svg+xml" ||
    type === "image/jpeg" ||
    type === "image/gif" ||
    type === "image/bmp"
  ) {
    reader.readAsDataURL(file); // Convert the image file to a Base64 encoding.

    // Once the file is loaded.
    reader.onload = () => {
      const { result } = reader;

      // 'slice()' is mandatory to display image data URLs.
      const data = result.slice(
        (type === "image/png" && 22) ||
          (type === "image/svg+xml" && 26) ||
          (type === "image/jpeg" && 23) ||
          (type === "image/gif" && 22) ||
          (type === "image/bmp" && 22)
      );

      setLoadedFile({ imageType: type, data: data });
    };

    // If the file isn't one of the approved file types above.
  } else {
    console.warn("Incorrect file type, please choose a correct file type.");
  }
};

export default handleFiles;