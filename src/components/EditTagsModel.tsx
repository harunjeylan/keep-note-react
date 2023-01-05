import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import { Tag } from "../util/type";

type EditTagsModelProps = {
  isModelOpen: boolean;
  setIsModelOpen: Function;
  allTags: Tag[];
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
};
const EditTagsModel = ({
  isModelOpen,
  setIsModelOpen,
  allTags,
  onUpdateTag,
  onDeleteTag,
}: EditTagsModelProps) => {
  return (
    <Box
      // onClick={() => setIsModelOpen(false)}
      className={`
       ${isModelOpen ? "absolute" : "hidden"} 
        top-0 left-0 w-full h-full bg-black/30
        z-20 px-4 duration-300 ease-in-out
        `}
    >
      <Box
        className={`z-40 flex flex-col gap-8
            w-auto h-auto mx-auto p-8 max-w-xl max-h-[80vh]
            rounded-lg overflow-auto mt-10
            bg-gray-200 
        `}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          justifyContent="space-between"
        >
          <Typography variant="h5" className="font-bold">
            Edit Tags
          </Typography>
          <IconButton onClick={() => setIsModelOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Stack direction="column" alignItems="center" spacing={2}>
          {allTags.map((tag) => (
            <Stack
              key={tag.id}
              direction="row"
              alignItems="center"
              spacing={1}
              justifyContent="space-between"
              className="w-full"
            >
              <TextField
                id="outlined-basic"
                label="Edit tag"
                variant="outlined"
                className="w-full"
                defaultValue={tag.label}
                onChange={(e) => onUpdateTag(tag.id, e.target.value)}
              />
              <IconButton onClick={() => onDeleteTag(tag.id)}>
                <DeleteOutlineIcon />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default EditTagsModel;
