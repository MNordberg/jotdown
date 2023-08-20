import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./NoteEdit.css";
import { IUser } from "../../data/IUser";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import { INote } from "../../data/INote";

function NoteEdit({ note, users, onClose, onSaved, onError }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const initValues = () => {
    return {
      userId: note?.user?.id || "",
      text: note?.text || "",
      date: note?.date || new Date(),
    };
  };

  const formik = useFormik({
    initialValues: initValues(),
    onSubmit: (values) => {
      setIsSaving(true);
      const saving = {
        ...values,
        id: note.id,
        user: users.find((u) => u.id == values.userId),
      };
      axios
        .put(`${import.meta.env.VITE_API_URL}/notes`, saving)
        .then((res) => onSaved(res.data))
        .catch((err) => onError(err.message))
        .finally(() => setIsSaving(false));
    },
  });

  useEffect(() => {
    if (note) {
      formik.setValues(initValues);
    }
    setIsOpen(!!note);
  }, [note]);

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>{note?.id ? "Edit" : "Add"} Note</DialogTitle>
        <DialogContent>
          <FormControl sx={{ minWidth: "12rem" }} size="small">
            <InputLabel id="user-label">Client</InputLabel>
            <Select
              label="Client"
              labelId="user-label"
              id="userId"
              name="userId"
              required
              value={formik.values.userId}
              onChange={formik.handleChange}
            >
              {users.map((user: IUser) => (
                <MenuItem key={user.id} value={user.id}>
                  {`${user.firstName} ${user.lastName}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Note"
            id="text"
            name="text"
            multiline
            rows={5}
            inputProps={{ maxLength: 300 }}
            value={formik.values.text}
            onChange={formik.handleChange}
          />
          <div className="hint">{formik.values.text?.length || 0} / 300</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            disabled={
              !formik.values.userId ||
              formik.values.text?.length < 20 ||
              isSaving
            }
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default NoteEdit;
