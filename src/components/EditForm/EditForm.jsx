import { Component } from 'react';
import DatalistInput from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';
import css from './EditForm.module.css';
import * as API from '../services/API';
import { items, setItems } from '../services/Items';

export default class EditForm extends Component {
  state = {
    title: '',
    descrtption: '',
    id: null,
    isExpanded: false,
  };

  componentDidMount() {
    const { title, descrtption, id } = this.props.item;
    this.setState({ title: title, descrtption: descrtption, id: id });
  }

  onSubmit = async e => {
    e.preventDefault();
    const { id } = this.state;
    const moddedItem = {
      Title: this.state.title,
      descrtption: this.state.descrtption,
    };

    try {
      await API.modifyNotes(id, moddedItem);
    } catch (error) {
      console.log(error);
    } finally {
      this.resetForm();
      this.props.onClose();
      this.props.Update();
    }
  };

  onChange = e => {
    this.setState(prev => ({ [e.target.name]: e.target.value }));
  };

  resetForm = () => {
    this.setState({ title: '', description: '' });
  };

  render() {
    const { title, descrtption } = this.state;
    return (
      <form onSubmit={this.onSubmit} className={css.form}>
        <h3 className={css.editName}>Изменить Заметку</h3>
        <DatalistInput
          className={css.editInput}
          name="title"
          placeholder="Заголовок"
          type="text"
          value={title}
          showLabel={false}
          onChange={e => this.setState({ title: e.target.value })}
          onSelect={item => this.setState({ title: item.value })}
          items={items()}
        />

        <textarea
          className={css.edittext}
          name="descrtption"
          cols="30"
          rows="10"
          value={descrtption}
          placeholder="Описание"
          onChange={this.onChange}
        ></textarea>

        <div className={css.btnContainer}>
          <button type="submit" className={css.formBtn}></button>
          <button type="button" className={css.formBtnClose} onClick={this.props.onClose}></button>
        </div>
      </form>
    );
  }
}
