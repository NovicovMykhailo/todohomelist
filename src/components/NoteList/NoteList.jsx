import NoteItem from '../NoteItem/NoteItem'
import css from './Nodename.module.css'

export default function Notelist({notes, onEdit, data, update, filtered}) {

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {notes.slice('').reverse().map(note => (
          <NoteItem key={note.id} note={note} onEdit={onEdit} data={data} update={update} filtered={filtered} />
        ))}
      </ul>
    </div>
  );
}


