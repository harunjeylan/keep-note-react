import { Button } from "@mui/material";
import { Container } from "@mui/system";
import { useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Tag, NoteData, RowNote } from "./util/type";
import { useLocalStorage } from "./service/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import Home from "./pages";
import NewNote from "./pages/newnote";
import EditNote from "./pages/editnote";
import NoteDetails from "./pages/noteDetails";
import NoteLayout from "./layout/NoteLayout";
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
  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
    navigate("..");
  }
  function onDeleteNote(id: string) {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
    navigate("/");
  }
  function addTag(tag: Tag) {
    setTags((prevTags) => [...prevTags, tag]);
  }
  function updateTag(id: string, label: string) {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  }

  function onDeleteTag(id: string) {
    setTags((prevTag) => {
      return prevTag.filter((tag) => tag.id !== id);
    });
  }

  return (
    <Container>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              allTags={tags}
              onUpdateTag={updateTag}
              onDeleteTag={onDeleteTag}
              allNotes={notsWithTags}
            />
          }
        />
        <Route
          path="/new"
          element={
            <NewNote onSubmit={onCreateNote} addTag={addTag} allTags={tags} />
          }
        />
        <Route path="/:noteId" element={<NoteLayout notes={notsWithTags} />}>
          <Route index element={<NoteDetails onDeleteNote={onDeleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onUpdateNote}
                addTag={addTag}
                allTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
