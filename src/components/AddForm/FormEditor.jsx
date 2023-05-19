import css from './AddForm.module.css'

export default function FormEditor({items, onClick, onCancel}) {
    return (
      <div className={css.deleteItem}>
        <button type="button" title="Удалить Шаблон" onClick={onClick}></button>

        <select name="Deleatelist" id="DeleteList">
          {items.map(item => (
            <option id={item.id} key={item.id} className={css.deleteEl}>
              {item.value}
            </option>
          ))}
        </select>
        <button type="button" title="Отменить" onClick={onCancel}></button>
      </div>
    );
}
