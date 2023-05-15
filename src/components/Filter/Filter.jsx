import css from './Filter.module.css';

export default function Filter({ onChange, filterValue }) {
  return (
    <div className={css.fieldset}>
      <input
        type="text"
        placeholder="find"
        className={css.field}
        onChange={onChange}
        value={filterValue}
      />
      <label>
        Mike
        <input type="checkbox" name="filter" id="Mike" onChange={onChange} />
      </label>
      <label>
        Kate
        <input type="checkbox" name="filter" id="Kate" onChange={onChange} />
      </label>
    </div>
  );
}
