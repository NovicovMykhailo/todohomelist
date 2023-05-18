import css from './Statistics.module.css';

export default function Statistics({ props }) {
  const doneByMike = props.filter(note => note.Mike === true).length;
  const doneByKate = props.filter(note => note.Kate === true).length;
  const Total = props.length;
  const UnDone = props.filter(note => note.Mike === false && note.Kate === false).length;

  return (
    <div className={css.stats}>
      <ul className={css.list}>
        <li>
          TOTAL: <span>{Total}</span>
        </li>
        <li>
          ❌: <span>{UnDone}</span>
        </li>
      </ul>
      <ul className={css.list}>
        <li>
          Mike: <span>{doneByMike} ✓</span>
        </li>
        <li>
          Kate: <span>{doneByKate} ✓</span>
        </li>
      </ul>
    </div>
  );
}
