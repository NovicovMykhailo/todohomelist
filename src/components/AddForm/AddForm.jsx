
import { Component } from 'react';
import css from './AddForm.module.css';

export default class AddForm extends Component {
  state = {
    title: '',
    description: '',
  };

  onSubmit = e => {
    e.preventDefault()
    console.log(e);
  };
  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
    
  }

  resetForm = () => {
    this.setState({ title: '', description: '' });
  };

  render() {
    const { title, description } = this.state;
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
          name="description"
          cols="30"
          rows="10"
          value={description}
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
