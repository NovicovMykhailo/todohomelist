import css from './App.module.css';
import NoteList from './NoteList/NoteList';
import Filter from './Filter/Filter';
import { Component } from 'react';

export class App extends Component {
  state = {
    notes: []
  }





  render() {
    return (
      <div className={css.App}>
        <NoteList />
        <Filter />
      </div>
    );
  }
}
