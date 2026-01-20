import React from 'react'
import ReactQuill from 'react-quill';

export default function Editor({value,onChange}) {
    
const modules = {
    toolbar: [
      [{ header: [1, 2, false] }], // Headings (H1, H2)
      ["bold", "italic", "underline", "strike"], // Text styling
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      [{ script: "sub" }, { script: "super" }], // Subscript/Superscript
      [{ indent: "-1" }, { indent: "+1" }], // Indentation
      [{ align: [] }], // Text alignment
      ["blockquote", "code-block"], // Blockquote & Code
      ["link", "image", "video"], // Media
      ["clean"], // Remove formatting
    ],
  };
  return (
    <ReactQuill 
           value={value}
           theme={'snow'}
           onChange={onChange}
           modules={modules} />
  )
}
