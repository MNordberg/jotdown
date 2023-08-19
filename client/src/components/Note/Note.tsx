import ReactTimeAgo from "react-time-ago";
import "./Note.css";

function Note({ note }) {
  return (
    <>
      <p>
        <span className="text">{note.text}</span>
        <small className="light">
          {note.user.firstName} {note.user.lastName} {" | "}
          <ReactTimeAgo date={new Date(note.date)} />
        </small>
      </p>
    </>
  );
}

export default Note;
