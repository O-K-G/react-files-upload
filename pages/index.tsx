import type { NextPage } from "next";
import React, { useState } from "react";
import Image from "next/image";
import handleFiles, { fileTypes } from "../components/handleFiles"; // Handles the actually uploaded files.

const Home: NextPage = () => {
  const [loadedFile, setLoadedFile] = useState<any>(false);
  const { fileObject, type } = loadedFile;
  const { imageFiles, documentFiles, unsupportedFiles } = fileTypes;

  const handleUpload = (e: any) => {
    const {
      target: {
        files: [file],
      },
    } = e;

    // 'if (file)...' to avoid code breaks when the user cancels the upload, after a previous upload already happened.
    if (file) {
      const { size } = file;
      size <= 2097152 // Example 2mb file size limit, before the rest of the validation proceeds.
        ? handleFiles(file, setLoadedFile)
        : console.warn("File size too big.");
    }
  };

  // A simulated fake fetch().
  const fakeFetch = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", "John");

    ///////// Start of uploaded file Base64 conversion. \\\\\\\\\\

    const reader: any = new FileReader();

    // 'fileObject && ...' is to avoid code breaks when the user hits 'Submit' without uploading a file.
    fileObject && reader.readAsDataURL(fileObject); // Convert the file to a Base64 encoding.
    reader.onload = () => {
      const { result } = reader; // To remove the base64 header from the string, add 'result.split(",").pop()'.

      ///////// End of uploaded file Base64 conversion. \\\\\\\\\\

      formData.append("file", result); // Switch 'result' to 'fileObject' if you need the unconverted file.
      console.log(formData.getAll("file"));
    };
    console.log(formData.getAll("firstName"));

    URL.revokeObjectURL(fileObject); // Needed once the URL object isn't needed anymore. For cleanup purposes.
  };

  return (
    <>
      <form encType="multipart/form-data" id="formElement" onSubmit={fakeFetch}>
        <input type="text" name="firstName" value="Some Value" readOnly />
        <label htmlFor="fileInput">Choose a file: </label>
        <input
          type="file"
          id="file"
          name="fileInput"
          accept=".png, .jpg, .jpeg, .gif, .bmp, .svg, .pdf, .tif, .webp, .doc, .docx, .odt, .txt, .rtf" // Changing this field also requires updating '/components/handleFiles.tsx' accordingly.
          onChange={handleUpload}
        />
        <input type="submit" />
      </form>

      {imageFiles.includes(type) && (
        <Image
          width={300}
          height={200}
          src={URL.createObjectURL(fileObject)}
          alt={"Some image"}
        />
      )}

      {documentFiles.includes(type) && (
        <embed
          src={URL.createObjectURL(fileObject)}
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
