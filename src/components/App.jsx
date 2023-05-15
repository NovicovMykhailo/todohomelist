import css from './App.module.css';
import NoteList from './NoteList/NoteList';
// import Filter from './Filter/Filter';
import { Component } from 'react';
import * as API from './services/API';
import Header from './Header/Header';

export class App extends Component {
  state = {
    notes: [],
    status: 'idle',
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

  render() {
    const { status, notes } = this.state;

    return (
      <div className={css.App}>
        <Header />
        {status === 'resolve' && <NoteList notes={notes} />}

        {/* <Filter /> */}
      </div>
    );
  }
}
