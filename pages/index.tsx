import type { NextPage } from "next";
import React, { useState } from "react";
import Image from "next/image";
import handleFiles, {
  fileTypes,
  convertFetch,
} from "../components/handleFiles"; // Handles the actually uploaded files.

const Home: NextPage = () => {
  const [loadedFiles, setLoadedFiles] = useState<any>([]);
  const { imageFiles, documentFiles, unsupportedFiles } = fileTypes;

  const handleUpload = (e: any) => {
    setLoadedFiles([]); // Clear state with each new upload.
    const {
      target: { files },
    } = e;
    Object.keys(files).forEach((n) => {
      const file = files[n];
      const { size } = files[n];

      size <= 2097152 // Example 2mb file size limit, before the rest of the validation proceeds.
        ? handleFiles(file, setLoadedFiles)
        : console.warn("File size too big.");
    });
  };

  // A simulated fake fetch() that also converts to Base64.
  const fakeFetch = (e: any) => {
    e.preventDefault();
    convertFetch(loadedFiles);
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
          multiple
        />
        <input type="submit" />
      </form>

      {loadedFiles.map((file: any) => {
        const { fileObject } = file;
        const { name } = fileObject;
        const { type } = file;

        return (
          <div key={name}>
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
          </div>
        );
      })}
    </>
  );
};

export default Home;
