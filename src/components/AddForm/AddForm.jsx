import { Component } from 'react';
import css from './AddForm.module.css';
import * as API from '../services/API';

export default class AddForm extends Component {
  state = {
    title: '',
    descrtption: '',
  };

  onSubmit = async e => {
    e.preventDefault();
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
      this.props.onClose();
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  resetForm = () => {
    this.setState({ title: '', description: '' });
  };

  render() {
    const { title, descrtption } = this.state;
    return (
      <form onSubmit={this.onSubmit} className={css.form}>
        <h3 className={css.name}>Добавить Заметку</h3>
        <input
          className={css.input}
          name="title"
          type="text"
          value={title}
          placeholder="Заголовок"
          onChange={this.onChange}
        />

        <textarea
          className={css.textarea}
          name="descrtption"
          cols="30"
          rows="10"
          value={descrtption}
          placeholder="Описание"
          onChange={this.onChange}
        ></textarea>
        <div className={css.btnContainer}>
          <button type="submit" className={css.formBtn}></button>
          <button
            type="button"
            className={css.formBtnClose}
            onClick={this.props.onClose}
          ></button>
        </div>
      </form>
    );
  }
}
