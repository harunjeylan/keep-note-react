import {
  Box,
  Button,
  Typography,
  TextField,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import React, { useMemo, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select/creatable";
import { Note, Tag, RowNote, RowNoteData } from "../util/type";
import { Notes } from "@mui/icons-material";

type TypeProps = {
  allTags: Tag[];
  allNotes: Note[];
};

const Home = ({ allTags, allNotes }: TypeProps) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const filteredNotes = useMemo(() => {
    return allNotes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [allNotes, selectedTags, title]);

  return (
    <Box>
      <Box className="flex justify-between items-center my-8 py-4 gap-8">
        <Box>
          <Typography variant="h3" className="font-bold">
            Notes
          </Typography>
        </Box>
        <Box className="flex gap-4">
          <Button
            variant="contained"
            className="bg-blue-600"
            onClick={() => navigate("/new")}
          >
            Create
          </Button>
          <Button variant="outlined">Edit</Button>
        </Box>
      </Box>
      <Box className="flex justify-between items-center my-8 py-4 gap-8">
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          className=""
          required
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          value={title}
        />
        <ReactSelect
          options={allTags.map((tag) => {
            return { label: tag.label, value: tag.id };
          })}
          value={selectedTags?.map((tag: Tag) => {
            return { label: tag.label, value: tag.id };
          })}
          onChange={(tags) => {
            setSelectedTags(
              tags.map((tag) => {
                return { label: tag.label, id: tag.value };
              })
            );
          }}
          className="w-full h-full"
          isMulti
        />
      </Box>
      <Box className="flex flex-col justify-between items-center my-8 py-4 gap-8">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {filteredNotes.map((note) => (
              <Grid key={note.id} xs={12} md={6} lg={4} xl={3}>
                <Card
                  variant="outlined"
                  className="hover:-translate-y-1 duration-150 ease-in-out drop-shadow-sm hover:drop-shadow-md"
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {note.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {note.body}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {note.tags?.map((tag) => (
                      <Chip key={tag.id} label={tag.label} />
                    ))}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
