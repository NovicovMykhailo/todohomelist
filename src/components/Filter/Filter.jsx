import css from './Filter.module.css';

export default function Filter({ onChange, filterValue }) {
  return (
    <div className={css.fieldset}>
      <input type="text" placeholder="find" className={css.field} onChange={onChange} value={filterValue} />
      <div className={css.checkContainer}>
        <label>
          Mike
          <input type="checkbox" name="filter" id="Mike" onChange={onChange} className={css.radio} />
        </label>
        <label>
          Kate
          <input type="checkbox" name="filter" id="Kate" onChange={onChange} className={css.radio} />
        </label>
        <label>
          All
          <input type="checkbox" name="filter" id="ShowAll" onChange={onChange} className={css.radio} />
        </label>
      </div>
    </div>
  );
}
