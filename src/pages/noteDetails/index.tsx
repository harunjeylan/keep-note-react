import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { useNote } from "../../layout/NoteLayout";
import MDEditor from "@uiw/react-md-editor";
import { useNavigate } from "react-router-dom";
import remarkGfm from "remark-gfm";

type NoteDetailProps = {
  onDeleteNote: (id: string) => void;
};
const NoteDetail = ({ onDeleteNote }: NoteDetailProps) => {
  const note = useNote();
  const navigate = useNavigate();
  return (
    <Box className="flex flex-col justify-between gap-8 mt-8">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Box>
          <Typography variant="subtitle1" component="h6">
            {note.title}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            justifyContent="center"
          >
            {note.tags?.map((tag) => (
              <Chip key={tag.id} label={tag.label} className="text-clip" />
            ))}
          </Stack>
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          justifyContent="center"
        >
          <Button
            onClick={() => navigate(`edit`)}
            className="bg-blue-600"
            variant="contained"
          >
            Edit
          </Button>
          <Button
            onClick={() => onDeleteNote(note.id)}
            color="secondary"
            variant="outlined"
          >
            Delete
          </Button>
          <Button onClick={() => navigate("..")} variant="outlined">
            Back
          </Button>
        </Stack>
      </Stack>
      <Box className="w-full" data-color-mode="light">
        <MDEditor.Markdown
          className="w-full h-fit"
          style={{ padding: 15 }}
          source={note.body}
          linkTarget="_blank"
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[]}
        />
      </Box>
    </Box>
  );
};

export default NoteDetail;
