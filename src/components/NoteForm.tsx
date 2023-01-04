import { Box, Button, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import React, { FormEvent, useState } from "react";
import * as Yup from "yup";
import CreatableReactSelect from "react-select/creatable";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import { NoteData, Tag } from "../util/type";
import { v4 as uuidV4 } from "uuid";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  addTag: (tag: Tag) => void;
  allTags: Tag[];
};

const NoteForm = ({ onSubmit, addTag, allTags }: NoteFormProps) => {
  const theme = useTheme();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formik.values);
    onSubmit(formik.values);
  };
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
      title: "",
      tags: [],
      body: "",
    },
    validationSchema: noteSchema,
    onSubmit: onSubmit,
  });
  return (
    <Box>
      <Box>
        <Typography className="font-bold" variant="h3" gutterBottom>
          New Note
        </Typography>
      </Box>
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
              <TextField
                id="outlined-multiline-static"
                error={Boolean(formik.touched.body && formik.errors.body)}
                fullWidth
                helperText={formik.touched.body && formik.errors.body}
                name="body"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.body}
                variant="outlined"
                size="small"
                label="Body"
                multiline
                rows={20}
                // defaultValue="note..."
              />
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
    </Box>
  );
};

export default NoteForm;
