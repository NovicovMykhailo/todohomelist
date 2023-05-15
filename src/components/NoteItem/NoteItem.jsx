import { Component } from 'react';
import css from './NoteItem.module.css';
import { format} from 'date-fns';
import { ru } from 'date-fns/locale';


export default class NoteItem extends Component {
  state = {
    Mike: false,
    Kate: false,
  };

  normalizedDate = format(new Date(this.props.note.createdAt), 'dd MMM yyyy', {
    locale: ru,
  });

  onChange = e => {
    this.setState(prevState => ({
      [e.target.name]: !prevState[e.target.name],
    }));
  };

  //rgb(211, 230, 220)

  render() {
    const { Mike, Kate } = this.state;
    const { note } = this.props;
    return (
      <li
        className={css.card}
        style={{
          backgroundColor: `${
            this.state.Mike || this.state.Kate
              ? 'rgb(102, 189, 150)'
              : 'rgb(211, 230, 220)'
          }`,
        }}
      >
        <div className={css.checkBoxes}>
          <div className={css.asside}>
            <div className={css.checkBoxWrapper}>
              <label>
                Kate
                <input
                  type="checkbox"
                  name="Kate"
                  id="Kate"
                  checked={Kate}
                  onChange={this.onChange}
                />
              </label>
            </div>
            <div className={css.checkBoxWrapper}>
              <label>
                Mike
                <input
                  type="checkbox"
                  name="Mike"
                  id="Mike"
                  checked={Mike}
                  onChange={this.onChange}
                />
              </label>
            </div>
          </div>
          <button type="button"className={css.edit}></button>

          <p className={css.date}>{this.normalizedDate}</p>
        </div>
        <h3>
          <b>{note.Title}</b>
        </h3>
        <p className={css.description}>{note.descrtption}</p>
        <button type='button' className={css.button}>delete</button>
      </li>
    );
  }
}
