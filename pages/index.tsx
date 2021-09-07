import type { NextPage } from "next";
import React, { useState } from "react";
import Image from "next/image";
import handleFiles, { fileTypes } from "../components/handleFiles"; // Handles the actually uploaded files.

const Home: NextPage = () => {
  const [loadedFile, setLoadedFile] = useState<any>(false);
  const { name, type, blob } = loadedFile;
  const { imageFiles, documentFiles, unsupportedFiles } = fileTypes;

  const handleUpload = (e: any) => {
    const {
      target: {
        files: [file],
      },
    } = e;
    file && handleFiles(file, setLoadedFile); // "file && ..." is to avoid code breaks when the user cancels the upload.
  };

  // Simulate a fake fetch().
  const fakeFetch = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", "John");
    formData.append(type, blob, name);
    console.log(formData.getAll("firstName"));
    console.log(formData.getAll(type));
  };

  // Add 'URL.revokeObjectURL(blobURL);' at a stage when the object isn't needed anymore.

  return (
    <>
      <form id="formElement" onSubmit={fakeFetch}>
        <input type="text" name="firstName" value="Some Value" readOnly />
        <label htmlFor="contained-button-file">Choose a file: </label>
        <input
          type="file"
          id="file"
          name="contained-button-file"
          accept=".png, .jpg, .jpeg, .gif, .bmp, .svg, .pdf, .tif, .webp, .doc, .docx, .odt" // Changing this field also requires updating '/components/handleFiles.tsx' accordingly.
          onChange={handleUpload}
        />
        <input type="submit" />
      </form>

      {imageFiles.includes(type) && (
        <Image
          width={300}
          height={200}
          src={URL.createObjectURL(blob)}
          alt={"Some image"}
        />
      )}

      {documentFiles.includes(type) && (
        <embed
          src={URL.createObjectURL(blob)}
          width="375"
          height="500"
          type={type}
        />
      )}

      {(unsupportedFiles.includes(type) ||
        type === "image/tiff" || // *.tif files.
        type === "application/vnd.oasis.opendocument.text") && ( // *.odt files.
        <p>
          The file is loaded, but the browser does not support in natively
          displaying it.
        </p>
      )}
    </>
  );
};

export default Home;
