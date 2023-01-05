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
import { useMemo, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select/creatable";
import { Note, Tag } from "../util/type";
import EditTagsModel from "../components/EditTagsModel";
import MDEditor from "@uiw/react-md-editor";
import remarkGfm from "remark-gfm";
type TypeProps = {
  allTags: Tag[];
  allNotes: Note[];
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
};

const Home = ({ allTags, allNotes, onUpdateTag, onDeleteTag }: TypeProps) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
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
          <Button onClick={() => setIsModelOpen(true)} variant="outlined">
            Edit Tgs
          </Button>
        </Box>
      </Box>
      <EditTagsModel
        isModelOpen={isModelOpen}
        setIsModelOpen={setIsModelOpen}
        allTags={allTags}
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
      />
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
          placeholder="search..."
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
        <Grid container spacing={2} className="w-full">
          {filteredNotes.map((note) => (
            <Grid key={note.id} xs={12} md={6} lg={4} xl={3}>
              <Box
                onClick={() => navigate(`/${note.id}`)}
                className="hover:-translate-y-1 duration-200 ease-in-out drop-shadow-sm hover:drop-shadow-md"
              >
                <Card
                  variant="outlined"
                  className="w-full h-full cursor-pointer"
                >
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="p"
                      className=""
                    >
                      {note.title}
                    </Typography>
                    <Box data-color-mode="light">
                      <MDEditor.Markdown
                        className="w-full h-fit"
                        style={{ padding: 15 }}
                        source={note.body.slice(0, 50)}
                        linkTarget="_blank"
                        remarkPlugins={[remarkGfm]}
                        // previewOptions={{
                        //   linkTarget: "_blank",
                        // }}
                      />
                    </Box>
                  </CardContent>
                  <CardActions>
                    {note.tags?.map((tag) => (
                      <Chip
                        key={tag.id}
                        label={tag.label}
                        className="text-clip"
                      />
                    ))}
                  </CardActions>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
