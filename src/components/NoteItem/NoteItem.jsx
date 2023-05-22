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
      Mike: this.state.Mike,
      Kate: this.state.Kate,
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
    if (this.state.Mike) return 'rgb(27,168,240)';
    if (this.state.Kate) return 'rgb(239,195,195)';
    return 'rgb(211, 230, 220)';
  }

  onCheck = async e => {
    const name = e.target.id;
    const checked = e.target.checked;
    let moddedItem = {
      Kate: false,
      Mike: false,
    };

    if (name === 'Kate' && checked === true) {
      moddedItem = { ...moddedItem, Kate: true };
    }
    if (name === 'Kate' && checked === false) {
      moddedItem = { ...moddedItem, Kate: false };
    }

    if (name === 'Mike' && checked === true) {
      moddedItem = { ...moddedItem, Mike: true };
    }
    if (name === 'Mike' && checked === false) {
      moddedItem = { ...moddedItem, Mike: false };
    }

    try {
         await API.modifyNotes(this.props.note.id, moddedItem);
          this.props.update();
        } catch (error) {
          console.log(error);
        }
      
  };
  
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
              <label >
                Kate
                <input
                  type="checkbox"
                  name="Kate"
                  id="Kate"
                  checked={Kate}
                  onChange={this.onChange}
                  onClick={this.onCheck}
                  disabled={Mike}
                />
              </label>
            </div>
            <div className={css.checkBoxWrapper}>
              <label >
                Mike
                <input
                  type="checkbox"
                  name="Mike"
                  id="Mike"
                  checked={Mike}
                  onChange={this.onChange}
                  onClick={this.onCheck}
                  disabled={Kate}
                />
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
