import { Box, Typography } from "@mui/material";
import NoteForm from "../../components/NoteForm";
import { NoteData, Tag } from "../../util/type";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  addTag: (tag: Tag) => void;
  allTags: Tag[];
};
const NewNote = ({ onSubmit, addTag, allTags }: NewNoteProps) => {
  return (
    <Box className="my-8">
      <Box>
        <Typography className="font-bold" variant="h4" gutterBottom>
          New Note
        </Typography>
      </Box>
      <NoteForm onSubmit={onSubmit} addTag={addTag} allTags={allTags} />
    </Box>
  );
};

export default NewNote;
