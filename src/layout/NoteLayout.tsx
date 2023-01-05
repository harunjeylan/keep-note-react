import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Note } from "../util/type";

type NoteLayoutProps = {
  notes: Note[];
};
const NoteLayout = ({ notes }: NoteLayoutProps) => {
  const { noteId } = useParams();
  const note = notes.find((note) => note.id === noteId);
  if (note == null) return <Navigate to="/" replace />;
  return <Outlet context={note} />;
};
export function useNote() {
  return useOutletContext<Note>();
}

export default NoteLayout;
