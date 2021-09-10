## General Purpose React.js / Next.js File Uploader

This is a simple (no visual design or even basic CSS) React.js / Next.js general purpose component to upload, display and send multiple files as part of a form (or without a form).

It's based on the code I initially wrote [here](https://github.com/O-K-G/polykick/blob/main/client/src/components/userPosts.js) (handleChange() with reader.readAsDataURL()).

This time it's used mostly with 'URL.createObjectURL()', which performs much better.

The form is available [here](https://github.com/O-K-G/react-files-upload/blob/main/pages/index.tsx).
The component is available [here](https://github.com/O-K-G/react-files-upload/blob/main/components/handleFiles.tsx).

## To run this in the development server:

```bash
npm run dev
```

It's available with your browser at [http://localhost:3000](http://localhost:3000).
