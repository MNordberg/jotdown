import ReactTimeAgo from "react-time-ago";
import "./Note.css";

function Note({ note }) {
  return (
    <>
      <p>
        <span className="text">{note.text}</span>
        <small className="light">
          <ReactTimeAgo date={note.date} />
        </small>
      </p>
    </>
  );
}

export default Note;
