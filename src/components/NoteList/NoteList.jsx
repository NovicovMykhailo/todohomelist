import NoteItem from '../NoteItem/NoteItem'
import css from './Nodename.module.css'

export default function Notelist({notes, onEdit}) {

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {notes.map(note => (
          <NoteItem key={note.id} note={note} onEdit={onEdit } />
        ))}
      </ul>
    </div>
  );
}


