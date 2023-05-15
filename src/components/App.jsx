import css from './App.module.css';
import NoteList from './NoteList/NoteList';
import { Component } from 'react';
import * as API from './services/API';
import Header from './Header/Header';
import EditForm from './EditForm/EditForm';
import AddForm from './AddForm/AddForm';
import Modal from './Modal/Modal';

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
      console.log('will update');
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
    this.setState(prevState => ({ doesItChange: prevState.doesItChange + 1 }));
  };

  render() {
    const { status, notes, isEditModalOpen, isAddModalOpen, currentCard, filter } =
      this.state;
    const normalizeFilter = filter.toLowerCase();

    const foundNotes = notes.filter(
      note => {
           return note.Title.toLowerCase().includes(normalizeFilter);
      }

       

        // if (Mike !== false) {
        // console.log(note.Mike===true)
        // return note.Mike.includes(Mike === true);
        // }
        // if (Kate !== false) {
        //   return note.Kate.includes(Kate === true);
        // }
      
       
      //  note.Title.toLowerCase().includes(normalizeFilter,Mike,Kate)
    );

    return (
      <div className={css.App}>
        <Header onAdd={this.onAdd} onChange={this.filtered} filterValue={filter} />
        {status === 'resolve' && (
          <NoteList
            notes={foundNotes}
            onEdit={this.onEdit}
            data={this.showItem}
            update={this.Update}
          />
        )}
        {isEditModalOpen && (
          <Modal
            children={
              <EditForm onClose={this.onEdit} item={currentCard} Update={this.Update} />
            }
            onClose={this.onEdit}
          />
        )}
        {isAddModalOpen && (
          <Modal
            children={<AddForm onClose={this.onAdd} Update={this.Update} />}
            onClose={this.onAdd}
          />
        )}
      </div>
    );
  }
}
