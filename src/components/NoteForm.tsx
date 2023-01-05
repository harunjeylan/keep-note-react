import { Box, Button, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import { FormEvent, useEffect, useState } from "react";
import * as Yup from "yup";
import CreatableReactSelect from "react-select/creatable";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import { NoteData, Tag } from "../util/type";
import { v4 as uuidV4 } from "uuid";
import MDEditor from "@uiw/react-md-editor";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  addTag: (tag: Tag) => void;
  allTags: Tag[];
} & Partial<NoteData>;

const NoteForm = ({
  onSubmit,
  addTag,
  allTags,
  title = "",
  body = "",
  tags = [],
}: NoteFormProps) => {
  const theme = useTheme();
  const [screenHeight, setScreenHeight] = useState(window.innerHeight - 200);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formik.values);
  };
  useEffect(() => {
    const resizeListener = () => {
      setScreenHeight(window.innerHeight - 240);
    };
    window.addEventListener("resize", resizeListener);
    return window.removeEventListener("scroll", resizeListener);
  }, []);
  const noteSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too Short!")
      .max(500, "Too Long!")
      .required("Required"),
    tags: Yup.array().of(Yup.string()),
    body: Yup.string(),
  });
  const formik = useFormik({
    initialValues: {
      title: title,
      tags: tags,
      body: body,
    },
    validationSchema: noteSchema,
    onSubmit: onSubmit,
  });
  return (
    <form onSubmit={handleSubmit} className="flex  flex-col gap-4">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <TextField
              error={Boolean(formik.touched.title && formik.errors.title)}
              fullWidth
              required
              helperText={formik.touched.title && formik.errors.title}
              label="title"
              name="title"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.title}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid xs={6}>
            <CreatableReactSelect
              options={allTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              onCreateOption={(label) => {
                const newTag = { label, id: uuidV4() };
                addTag(newTag);
                formik.setFieldValue("tags", [...formik.values.tags, newTag]);
              }}
              value={formik.values.tags?.map((tag: Tag) => {
                return { label: tag.label, value: tag.id };
              })}
              onChange={(tags) => {
                formik.setFieldValue(
                  "tags",
                  tags.map((tag) => {
                    return { label: tag.label, id: tag.value };
                  })
                );
              }}
              isMulti
            />
          </Grid>
          <Grid xs={12}>
            <Box className="w-full h-fit" data-color-mode="light">
              <MDEditor
                height={screenHeight}
                className="w-full h-fit"
                value={formik.values.body}
                onChange={(newValue) =>
                  formik.setFieldValue(
                    "body",
                    newValue !== undefined ? newValue : ""
                  )
                }
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box className="flex justify-start items-center gap-2">
        <Link to="..">
          <Button variant="contained" className="bg-blue-600" type="reset">
            cancel
          </Button>
        </Link>
        <Button variant="outlined" type="submit">
          Save
        </Button>
      </Box>
    </form>
  );
};

export default NoteForm;
