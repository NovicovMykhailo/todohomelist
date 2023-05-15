import css from './Filter.module.css';
export default function Filter() {
  return (
    <div className={css.fieldset}>
      <input type="text" placeholder="find" className={css.field} />
      <label>
        Mike
        <input type="radio" name="filter" id="Mike" />
      </label>
      <label>
        Kate
        <input type="radio" name="filter" id="Kate" />
      </label>
    </div>
  );
}
