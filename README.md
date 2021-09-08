## General Purpose React.js / Next.js File Uploader

This is a simple (no visual design or even basic CSS) React.js / Next.js general purpose component to upload, display and send files as part of a form (or without a form).

It's based on the code I initially wrote [here](https://github.com/O-K-G/polykick/blob/main/client/src/components/userPosts.js) (handleChange() with reader.readAsDataURL()).

I always felt that 'readAsDataURL()' required too much unnecessary workarounds just to be able to "properly" display, send, store and retrieve blobs. Things like conversions to 'base64' back and forth, using slice() on the strings and whatnot. The more you convert, the more prone to errors the whole process is. Either way, this 'readAsDataURL()' solution is just a partial solution for only some file types.

So instead of 'readAsDataURL()', this project is using 'URL.createObjectURL()'.
'URL.createObjectURL()' doesn't need the previous unnecessary code and conversions, and it allows a more simple display of uploaded files.
'FormData()' is there just for an easier collection of form fields keys and values.

The form is available [here](https://github.com/O-K-G/react-files-upload/blob/main/pages/index.tsx).
The component is available [here](https://github.com/O-K-G/react-files-upload/blob/main/components/handleFiles.tsx).

## To run this in the development server:

```bash
npm run dev
```

It's available with your browser at [http://localhost:3000](http://localhost:3000).