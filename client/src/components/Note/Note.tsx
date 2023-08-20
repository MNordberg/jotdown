import ReactTimeAgo from "react-time-ago";
import "./Note.css";
import { INote } from "../../interfaces/INote";

function Note(props: { note: INote; onEdit: any; onDelete: any }) {
  const { note, onEdit, onDelete } = props;
  return (
    <>
      <p className="hover-parent">
        <span className="text">{note.text}</span>
        <small className="light note-info">
          <span>
            Re: {note.user?.firstName} {note.user?.lastName} {" | "}
            <ReactTimeAgo date={new Date(note.date)} />
          </span>
          <span className="actions">
            <a onClick={onEdit}>Edit</a>
            {" | "}
            <a onClick={onDelete}>Delete</a>
          </span>
        </small>
      </p>
    </>
  );
}

export default Note;
