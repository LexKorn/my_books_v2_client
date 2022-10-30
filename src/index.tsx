import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import UserStore from './store/UserStore';
import NoteStore from './store/NoteStore';
import LibraryStore from './store/LibraryStore';

import './style/style.sass';

type RootStateContextValue = {
  user: UserStore;
  // note: NoteStore;
  library: LibraryStore;
};

export const Context = createContext<RootStateContextValue>({} as RootStateContextValue);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    // note: new NoteStore(),
    library: new LibraryStore()
  }}>
    <App />
  </Context.Provider>
);