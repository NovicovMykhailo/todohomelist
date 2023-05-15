import css from './Header.module.css'

export default function Header() {
    return (<div className={css.headder}>
        <button type='button' className={css.button}>+</button>
    </div>)
}