//   "Mike": false,
//   "Kate": false,
//   "Title": "Title 1",
//   "descrtption": "descrtption 1",

import { Component } from 'react';
import css from './EditForm.module.css';

export default class EditForm extends Component {
  state = {
    title: '',
    description: '',
  };

  componentWillMount() {
    const { title, description } = this.props;
    this.setState({ title: title, description: description });
  }

    onSubmit = e => {
      e.preventDefault()
    console.log(e);
  };


  resetForm = () => {
    this.setState({ title: '', description: '' });
  };

  render() {
    const { title, description } = this.state;
    return (
      <form onSubmit={this.onSubmit} className={css.form}>
        <h3 className={css.editName}>Изменить Заметку</h3>
        <input
          type="text"
          className={css.editInput}
          value={title}
          placeholder=" Заголовок"
        />

        <textarea
          className={css.edittext}
          name="description"
          cols="30"
          rows="10"
          value={description}
          placeholder="Описание"
        ></textarea>

        <div className={css.btnContainer}>
          <button type="submit" className={css.formBtn}></button>
          <button type="button" className={css.formBtnClose} onClick={this.props.onClose}></button>
        </div>
      </form>
    );
  }
}
