import { Component } from 'react';
import css from './NoteItem.module.css';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import * as API from '../services/API';

export default class NoteItem extends Component {
  state = {
    Mike: false,
    Kate: false,
    title: '',
    descrtption: '',
    id: null,
  };

  componentDidMount() {
    const { Mike, Kate, Title, descrtption, id } = this.props.note;
    this.setState({
      Mike: Mike,
      Kate: Kate,
      title: Title,
      descrtption: descrtption,
      id: id,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.Mike !== prevState.Mike || this.state.Kate !== prevState.Kate) {
      const moddedItem = {
        Kate: this.state.Kate,
        Mike: this.state.Mike,
      };
      try {
        API.modifyNotes(this.props.note.id, moddedItem);
      } catch (error) {
        console.log(error);
      }
    }
  }

  onChange = e => {
    this.setState(prevState => ({
      [e.target.name]: !prevState[e.target.name],
    }));
  };

  onClick = e => {
    this.props.onEdit();
    const CardData = {
      title: this.props.note.Title,
      descrtption: this.props.note.descrtption,
      id: this.state.id,
    };
    this.props.data(CardData);
  };

  onDelete = async e => {
    try {
      await API.deleteNotes(this.state.id);
    } catch (error) {
      console.log(error);
    } finally {
      this.props.update();
    }
  };

  activeItem() {
    if (this.state.Mike) {
      return 'rgb(27,168,240)';
    }
    if (this.state.Kate) {
      return 'rgb(239,195,195)';
    }
    return 'rgb(211, 230, 220)';
  }

  render() {
    const normalizedDate = format(new Date(this.props.note.createdAt), 'dd MMM ', {
      locale: ru,
    });

    const { Mike, Kate, descrtption, title } = this.state;

    return (
      <li
        className={css.card}
        style={{
          backgroundColor: `${this.activeItem()}`,
        }}
      >
        <div className={css.checkBoxes}>
          <div className={css.asside}>
            <div className={css.checkBoxWrapper}>
              <label>
                Kate
                <input type="checkbox" name="Kate" id="Kate" checked={Kate} onChange={this.onChange} />
              </label>
            </div>
            <div className={css.checkBoxWrapper}>
              <label>
                Mike
                <input type="checkbox" name="Mike" id="Mike" checked={Mike} onChange={this.onChange} />
              </label>
            </div>
          </div>
          <button type="button" className={css.edit} name="edit" onClick={this.onClick}></button>
          <p className={css.date}>{normalizedDate}</p>
        </div>
        <h3>
          <b>{title}</b>
        </h3>
        <p className={css.description}>{descrtption}</p>
        <button type="button" className={css.button} onClick={this.onDelete}>
          delete
        </button>
      </li>
    );
  }
}
