import { useEffect, useState } from "react";
import {
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import Note from "./components/Note/Note";
import axios from "axios";
import "./App.css";
import { INote } from "./components/Note/INote";
import { useDebouncedCallback } from "use-debounce";

function App() {
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes]: [INote[], Function] = useState([]);
  const [message, setMessage] = useState(null);

  const debounceFilter = useDebouncedCallback(setFilter, 300);

  useEffect(() => {
    axios(`${import.meta.env.VITE_API_URL}/notes`, {
      params: { filter: filter },
    })
      .then((res) => setNotes(res.data))
      .catch((err) => setMessage(err.message))
      .finally(() => setIsLoading(false));
  }, [filter]);

  const filterControl = (
    <>
      <FormControl sx={{ width: "100%" }} variant="outlined">
        <InputLabel htmlFor="filter">Search...</InputLabel>

        <OutlinedInput
          id="filter"
          label="Search..."
          onChange={(e) => debounceFilter(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  );

  const notesList = (
    <List>
      {notes.map((note: INote) => (
        <>
          <Divider />
          <ListItem>
            <Note note={note} key={note.id}></Note>
          </ListItem>
        </>
      ))}
    </List>
  );

  const dismissMessage = (
    <React.Fragment>
      <Button color="primary" size="small" onClick={() => setMessage(null)}>
        OK
      </Button>
    </React.Fragment>
  );

  const loadingText = <p>Loading...</p>;

  const emptyText = <p>{`No ${filter ? "matching" : ""} notes found.`}</p>;

  return (
    <>
      <div id="header">
        <img src="/jotdown.svg" alt="Logo" />
        <h1>Jotdown</h1>
      </div>
      <div id="main">
        <div>{filterControl}</div>
        {isLoading ? loadingText : notes.length ? notesList : emptyText}
      </div>
      <div className="floating-action">
        <Fab size="medium" color="primary" aria-label="add" className="mobile">
          <AddIcon />
        </Fab>
        <Fab
          variant="extended"
          color="primary"
          size="medium"
          className="hidden-mobile"
        >
          <AddIcon sx={{ mr: 1 }} />
          Add Note
        </Fab>
      </div>
      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        message={message}
        action={dismissMessage}
      />
    </>
  );
}

export default App;
