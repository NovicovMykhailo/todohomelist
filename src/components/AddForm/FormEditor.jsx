import css from './AddForm.module.css'

export default function FormEditor({items, onClick, onCancel, onReset}) {
    return (
      <div className={css.deleteItem}>
        <button type="button" title="Отменить" onClick={onCancel}></button>

        <select name="Deleatelist" id="DeleteList">
          {items.map(item => (
            <option id={item.id} key={item.id} className={css.deleteEl}>
              {item.value}
            </option>
          ))}
        </select>
        <button type="button" title="Удалить Шаблон" onClick={onClick}></button>
        <button type="button" title="Обнулить Шаблон" onClick={onReset}></button>
      </div>
    );
}
