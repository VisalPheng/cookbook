import React from "react";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Card, Typography } from "@mui/material";

export default function CustomEditor({
  value,
  onChange,
  error,
  helperText,
  label,
  placeholder,
  ...other
}) {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createWithContent(stateFromHTML(value))
  );

  const toolbarOptions = {
    options: ["inline", "blockType", "list", "link", "history"],
    inline: {
      inDropdown: false,
      className: undefined,
      component: undefined,
      dropdownClassName: undefined,
      options: ["bold", "underline"],
    },
    blockType: {
      inDropdown: true,
      options: ["Normal", "H2", "H3", "H4", "H5"],
    },
    list: {
      inDropdown: false,
      options: ["unordered", "ordered"],
    },
    link: {
      inDropdown: false,
      defaultTargetOption: "_self",
      options: ["link", "unlink"],
    },
    history: {
      inDropdown: false,
      options: ["undo", "redo"],
    },
  };

  function myBlockRenderer(contentBlock) {
    const type = contentBlock.getType();
    if (type === "header-one") {
      return {
        component: Typography,
        editable: false,
        props: {
          variant: "h1",
        },
      };
    }
  }

  let htmlOptions = {
    blockRenderers: {
      "header-one": (block) => {
        return <Typography variant="h1">escape(block.getText())</Typography>;
      },
    },
  };

  return (
    <Card
      sx={{
        p: 2,
        border: !!error ? "1px solid red" : "1px solid rgba(0,0,0,0.1)",
        boxShadow: 0,
        borderRadius: "8px",
        "& .rdw-editor-main": {
          minHeight: "300px",
        },
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{ mb: 1, color: !!error ? "red" : "#919EAB" }}
      >
        {label}
      </Typography>
      <Editor
        // @ts-ignore
        editorState={editorState}
        onEditorStateChange={(newValue) => {
          setEditorState(newValue);
          // @ts-ignore
          onChange(stateToHTML(newValue.getCurrentContent(), htmlOptions));
        }}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        toolbar={toolbarOptions}
        customBlockRenderFunc={myBlockRenderer}
        placeholder={placeholder}
        {...other}
      />
      <Typography variant="caption" sx={{ mt: 2, color: "red" }}>
        {helperText}
      </Typography>
      {/* @ts-ignore */}
      {/* <pre>{stateToHTML(editorState.getCurrentContent(), htmlOptions)}</pre> */}
      {/* @ts-ignore */}
      {/* <pre>{JSON.stringify(editorState.getCurrentContent(), false, 2)}</pre> */}
    </Card>
  );
}
