import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  Fab,
  FormControl,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  OutlinedInput,
  Snackbar,
  TextField,
  ThemeProvider,
  Tooltip,
  createTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import Note from "./components/Note/Note";
import axios from "axios";
import "./App.css";
import { INote } from "./data/INote";
import { IUser } from "./data/IUser";
import NoteEdit from "./components/NoteEdit/NoteEdit";
import Search from "./components/Search/Search";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        light: "#b1a1de",
        main: "#775bc5",
        dark: "#452e84",
      },
    },
  });

  const [filter, setFilter] = useState("");
  const [userId, setUserId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers]: [IUser[], Function] = useState([]);
  const [notes, setNotes]: [INote[], Function] = useState([]);
  const [editNote, setEditNote]: [INote | null, Function] = useState(null);
  const [message, setMessage]: [string, Function] = useState("");

  const addNote = () => setEditNote({ date: new Date() });

  const onNoteSaved = (saved) => {
    const noteToUpdate = notes.find((n) => n.id == saved.id);
    if (noteToUpdate) {
      Object.assign(noteToUpdate, saved);
    } else {
      notes.unshift(saved);
    }
    setNotes(notes);
    setEditNote(null);
  };

  const deleteNote = (note) => {
    const idx = notes.indexOf(note);
    notes.splice(idx, 1);
    setNotes([...notes]);
    axios
      .delete(`${import.meta.env.VITE_API_URL}/notes/${note.id}`)
      .catch((err) => {
        notes.splice(idx, 0, note);
        setNotes([...notes]);
        setMessage(err.message);
      });
  };

  useEffect(() => {
    axios(`${import.meta.env.VITE_API_URL}/users`)
      .then((res) => setUsers(res.data))
      .catch((err) => setMessage(err.message));
  }, []);

  useEffect(() => {
    axios(`${import.meta.env.VITE_API_URL}/notes`, {
      params: { filter: filter || null, userId: userId || null },
    })
      .then((res) => setNotes(res.data))
      .catch((err) => setMessage(err.message))
      .finally(() => setIsLoading(false));
  }, [filter, userId]);

  const notesList = (
    <List>
      {notes.map((note: INote) => (
        <React.Fragment key={note.id}>
          <Divider />
          <ListItem>
            <Note
              note={note}
              key={note.id}
              onEdit={() => setEditNote(note)}
              onDelete={() => deleteNote(note)}
            />
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );

  const action = !editNote && (
    <div className="floating-action">
      <Fab
        size="medium"
        color="primary"
        aria-label="add"
        className="mobile"
        onClick={addNote}
      >
        <AddIcon />
      </Fab>
      <Fab
        variant="extended"
        color="primary"
        size="medium"
        className="hidden-mobile"
        onClick={addNote}
      >
        <AddIcon sx={{ mr: 1 }} />
        Add Note
      </Fab>
    </div>
  );

  const dismissMessage = (
    <React.Fragment>
      <Button color="primary" size="small" onClick={() => setMessage(null)}>
        OK
      </Button>
    </React.Fragment>
  );

  const loadingText = <p>Loading...</p>;

  const emptyText = (
    <p>{`No ${filter || userId ? "matching" : ""} notes found.`}</p>
  );

  return (
    <ThemeProvider theme={theme}>
      <div id="header">
        <img src="/jotdown.svg" alt="Logo" />
        <h1>Jotdown</h1>
      </div>
      <div id="main">
        <Search
          users={users}
          userId={userId}
          onFilterChange={setFilter}
          onUserSelected={setUserId}
        ></Search>
        {isLoading ? loadingText : notes.length ? notesList : emptyText}
      </div>
      {action}
      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        message={message}
        action={dismissMessage}
      />
      <NoteEdit
        note={editNote}
        users={users}
        onClose={() => setEditNote(null)}
        onSaved={onNoteSaved}
        onError={(message: string) => setMessage(message)}
      ></NoteEdit>
    </ThemeProvider>
  );
}

export default App;
