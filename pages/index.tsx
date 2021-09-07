import type { NextPage } from "next";
import React, { useState } from "react";
import Image from "next/image";
import handleFiles, { imageTypes, docTypes } from "../components/handleFiles"; // Handles the actually uploaded files.

const Home: NextPage = () => {
  const [loadedFile, setLoadedFile] = useState<any>(false);
  const { type, data } = loadedFile;

  const handleUpload = (e: any) => {
    const {
      target: {
        files: [file],
      },
    } = e;
    file && handleFiles(file, setLoadedFile); // "file && ..." is to avoid code breaks when the user cancels the upload.
  };

  return (
    <>
      <label htmlFor="contained-button-file">Choose a file: </label>

      <input
        type="file"
        id="file"
        name="contained-button-file"
        accept=".png, .jpg, .jpeg, .gif, .bmp, .svg, .pdf" // Changing this field also requires updating '/components/handleFiles.tsx' accordingly.
        onChange={handleUpload}
      />
      {imageTypes.includes(type) && (
        <Image
          width={300}
          height={200}
          src={data}
          alt={"Some image"}
        />
      )}

      {docTypes.includes(type) && (
        <embed src={data} width="375" height="500" type={type} />
      )}
    </>
  );
};

export default Home;
