import { Box } from "@mui/material";
import React from "react";
import NoteForm from "../../components/NoteForm";
import { NoteData, Tag } from "../../util/type";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  addTag: (tag: Tag) => void;
  allTags: Tag[];
};
const NewNote = ({ onSubmit, addTag, allTags }: NewNoteProps) => {
  return (
    <Box className="">
      <NoteForm onSubmit={onSubmit} addTag={addTag} allTags={allTags} />
    </Box>
  );
};

export default NewNote;
