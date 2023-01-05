import { Box, Typography } from "@mui/material";
import NoteForm from "../../components/NoteForm";
import { useNote } from "../../layout/NoteLayout";
import { NoteData, Tag } from "../../util/type";

type NewNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  addTag: (tag: Tag) => void;
  allTags: Tag[];
};
const NewNote = ({ onSubmit, addTag, allTags }: NewNoteProps) => {
  const note = useNote();
  return (
    <Box className="my-8">
      <Box>
        <Typography className="font-bold" variant="h4" gutterBottom>
          Edit Note
        </Typography>
      </Box>
      <NoteForm
        title={note.title}
        body={note.body}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        addTag={addTag}
        allTags={allTags}
      />
    </Box>
  );
};

export default NewNote;
