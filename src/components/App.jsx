import css from './App.module.css';
import NoteList from './NoteList/NoteList';
// import Filter from './Filter/Filter';
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
    // finally {
    //   this.setState({ status: 'resolve' });
    // }
  }

  onEdit = () => {
    this.setState(prev => ({ isEditModalOpen: !prev.isEditModalOpen }));
  };
  onAdd = () => {
     this.setState(prev => ({ isAddModalOpen: !prev.isAddModalOpen }));
    
  }

  render() {
    const { status, notes, isEditModalOpen, isAddModalOpen } = this.state;

    return (
      <div className={css.App}>
        <Header onAdd={this.onAdd} />
        {status === 'resolve' && <NoteList notes={notes} onEdit={this.onEdit} />}
        {isEditModalOpen && (
          <Modal children={<EditForm onClose={this.onEdit} />} onClose={this.onEdit} />
        )}
        {isAddModalOpen && (
          <Modal children={<AddForm onClose={this.onAdd} />} onClose={this.onAdd} />
        )}
      </div>
    );
  }
}
