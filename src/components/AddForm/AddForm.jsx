import { Component} from 'react';
import css from './AddForm.module.css';
import * as API from '../services/API';
import DatalistInput from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';
import { items, setItems, removeItem } from '../services/Items';
import FormEditor from './FormEditor';
import editIcon from '../images/pencil-edit.svg';

import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';


export default class AddForm extends Component {

  state = {
    title: '',
    descrtption: '',
    isExpanded: false,
    items: items(),
    showEditor: false,
  };
  Notification = () => {
    NotificationManager.info('Заполните Поля', 'Пожалуйста 🙂', 1500);
  };

  onSubmit = async e => {
    e.preventDefault();
    if (this.state.title.trim() !== '') {
      const item = {
        Title: this.state.title,
        descrtption: this.state.descrtption,
        Mike: false,
        Kate: false,
      };

      try {
        await API.addNotes(item);
      } catch (error) {
        console.log(error);
      } finally {
        this.props.Update();
        setItems(this.state.title);
        this.props.onClose();
      }
    } else {
      this.Notification();
    }
  };

  deleteItem = e => {
    if (JSON.parse(localStorage.getItem('Items-List')).length !== 0) {
      const selectedEl = e.target.form[3].selectedOptions[0].value;
      removeItem(selectedEl);
      this.props.toggle();
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  resetForm = () => {
    this.setState({ title: '', description: '' });
  };

  onClick = () => {
    this.setState({ placeHolder: 'Заголовок' });
    this.setState(prev => ({ isExpanded: !prev.isExpanded }));
  };
  onOpenEditor = () => {
    this.setState(prev => ({ showEditor: !prev.showEditor }));
  };
  ResetLocalStorage = () => {
    if (window.localStorage.getItem('Items-List')) {
      window.localStorage.removeItem('Items-List');
      this.props.onClose();
    }
  };

  render() {
    const { title, descrtption, items, showEditor } = this.state;
    return (
      <form onSubmit={this.onSubmit} className={css.form}>
        <h3 className={css.name}>Добавить Заметку</h3>
        <DatalistInput
          className={css.input}
          placeholder="Заголовок"
          name="title"
          type="text"
          value={title}
          showLabel={false}
          onSelect={item => this.setState({ title: item.value })}
          onChange={e => this.setState({ title: e.target.value })}
          items={items}
          onClick={this.onClick}
          isExpanded={this.state.isExpanded}
        />
        <NotificationContainer/>
        <textarea
          className={css.textarea}
          name="descrtption"
          cols="30"
          rows="10"
          value={descrtption}
          placeholder="Описание"
          onChange={this.onChange}
        ></textarea>
        {!showEditor && (
          <button type="button" onClick={this.onOpenEditor} className={css.showEditor}>
            Редактировать закладки <img src={editIcon} alt="edit Icon" width="18" />
          </button>
        )}
        {showEditor && (
          <FormEditor
            items={items}
            onClick={this.deleteItem}
            onCancel={this.onOpenEditor}
            onReset={this.ResetLocalStorage}
          />
        )}
        <div className={css.btnContainer}>
          <button type="submit" className={css.formBtn}></button>
          <button type="button" className={css.formBtnClose} onClick={this.props.onClose}></button>
        </div>
      </form>
    );
  }
}
