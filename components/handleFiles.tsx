const handleFiles = (file: any, setLoadedFile: any) => {
  const reader: any = new FileReader();
  const { type } = file; // Add "const { name, size, type } = file"; if you need the filename or filesize.

  // Allowed image file types.
  const imageTypes = [
    "image/png",
    "image/svg+xml",
    "image/jpeg",
    "image/gif",
    "image/bmp",
  ];

  const [png, svgXml, jpeg, gif, bmp] = imageTypes;

  // If the files are image files.
  if (imageTypes.includes(type)) {
    reader.readAsDataURL(file); // Convert the image file to a Base64 encoding.

    // Once the file is loaded.
    reader.onload = () => {
      const { result: data } = reader;

      // 'slice()' is mandatory to display image data URLs.
      setLoadedFile({
        imageType: type,
        data: data.slice(
          (type === png && 22) ||
            (type === svgXml && 26) ||
            (type === jpeg && 23) ||
            (type === gif && 22) ||
            (type === bmp && 22)
        ),
      });
    };

    // If the file isn't one of the approved file types above.
  } else {
    console.warn("Incorrect file type, please choose a correct file type.");
  }
};

export default handleFiles;
