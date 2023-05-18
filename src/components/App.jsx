import css from './App.module.css';
import NoteList from './NoteList/NoteList';
import { Component } from 'react';
import * as API from './services/API';
import Header from './Header/Header';
import EditForm from './EditForm/EditForm';
import AddForm from './AddForm/AddForm';
import Modal from './Modal/Modal';
import { Triangle } from 'react-loader-spinner';
import Statistics from './Statistics/Statistics';

export class App extends Component {
  state = {
    notes: [],
    status: 'idle',
    isAddModalOpen: false,
    isEditModalOpen: false,
    currentCard: {},
    doesItChange: 1,
    filter: '',
    Mike: false,
    Kate: false,
    ShowAll: false,
  };

  async componentDidMount() {
    try {
      this.setState({ status: 'pending' });
      const notes = await API.getNotes();
      if (notes) {
        this.setState({ notes: notes.data, status: 'resolve' });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.doesItChange !== prevState.doesItChange) {
      // console.log('will update');
      try {
        this.setState({ status: 'pending' });
        const notes = await API.getNotes();
        if (notes) {
          this.setState({ notes: notes.data, status: 'resolve' });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  filtered = data => {
    if (data.target.id === 'Kate') {
      this.setState(prevState => ({ Kate: !prevState.Kate }));
    }
    if (data.target.id === 'Mike') {
      this.setState(prevState => ({ Mike: !prevState.Mike }));
    }
    if (data.target.id === 'ShowAll') {
      this.setState(prevState => ({ ShowAll: !prevState.ShowAll }));
    }
    if (data.target.placeholder === 'find') {
      this.setState({ filter: data.target.value });
    }
  };

  onEdit = () => {
    this.setState(prev => ({ isEditModalOpen: !prev.isEditModalOpen }));
  };

  onAdd = () => {
    this.setState(prev => ({ isAddModalOpen: !prev.isAddModalOpen }));
  };

  showItem = data => {
    this.setState({ currentCard: data });
  };

  Update = () => {
    this.setState({ status: 'pending' });
    this.setState(prevState => ({ doesItChange: prevState.doesItChange + 1 }));
  };

  render() {
    const { status, notes, isEditModalOpen, isAddModalOpen, currentCard, filter, Mike, Kate, ShowAll } = this.state;
    const normalizeFilter = filter.toLowerCase();

    function filterItem(notesArrays) {
      if (Mike !== false) {
        return notesArrays.filter(note => note.Mike);
      }
      if (Kate !== false) {
        return notesArrays.filter(note => note.Kate);
      }
      if (ShowAll !== false) {
        return notesArrays;
      }
      if (filter !== '') {
        return notesArrays.filter(note => {
          return note.Title.toLowerCase().includes(normalizeFilter);
        });
      }
      return notesArrays.filter(note => note.Kate !== true && note.Mike !== true)


    }

    const foundNotes = filterItem(notes);

    return (
      <div className={css.App}>
        <Header onAdd={this.onAdd} onChange={this.filtered} filterValue={filter} />
        {status === 'pending' && (
          <Triangle
            height="140"
            width="140"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName="Loader"
            visible={true}
          />
        )}
        {status === 'resolve' && (
          <>
            <Statistics props={notes} />
            <NoteList notes={foundNotes} onEdit={this.onEdit} data={this.showItem} update={this.Update} />
          </>
        )}

        {isEditModalOpen && (
          <Modal
            children={<EditForm onClose={this.onEdit} item={currentCard} Update={this.Update} />}
            onClose={this.onEdit}
          />
        )}
        {isAddModalOpen && (
          <Modal children={<AddForm onClose={this.onAdd} Update={this.Update} />} onClose={this.onAdd} />
        )}
      </div>
    );
  }
}
