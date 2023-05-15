import Filter from 'components/Filter/Filter'
import css from './Header.module.css'

export default function Header(props) {
    return (
      <div className={css.headder}>
        <button type="button" className={css.button} onClick={props.onAdd}>
          +
        </button>
        <Filter />
      </div>
    );
}