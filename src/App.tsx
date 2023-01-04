import { Button } from "@mui/material";
import { Container } from "@mui/system";
import { useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NewNote from "./pages/newnote";
import { Tag, NoteData, RowNote } from "./util/type";
import { useLocalStorage } from "./service/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import Home from "./pages";
function App() {
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  const [notes, setNotes] = useLocalStorage<RowNote[]>("NOTES", []);
  const navigate = useNavigate();

  const notsWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);
  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
    navigate("..");
  }
  function addTag(tag: Tag) {
    setTags((prevTags) => [...prevTags, tag]);
  }
  return (
    <Container>
      <Routes>
        <Route
          path="/"
          element={<Home allTags={tags} allNotes={notsWithTags} />}
        />
        <Route
          path="/new"
          element={
            <NewNote onSubmit={onCreateNote} addTag={addTag} allTags={tags} />
          }
        />
        <Route path="/:noteId">
          <Route index element={<h1>Home Detail</h1>} />
          <Route path="edit" element={<h1>Edit Page</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
