import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {Form, Container, Button} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
// import {v4 as uuidv4} from 'uuid';

import { INote } from '../types/types';
import List from '../components/List';
import NoteItem from '../components/NoteItem';
import {createNote, deleteNote, fetchNotes} from '../http/noteAPI';
import {Context} from '../index';

// import './notesPage.sass';


const NotesPage: React.FC = observer(() => {
    const [value, setValue] = useState<string>('');
    const [notes, setNotes] = useState<INote[]>([]);
    const {note} = useContext(Context);
    const navigate = useNavigate();

    const addNote = () => {        //e: React.MouseEvent<HTMLButtonElement>
        createNote(value)
            .then(data => {
                console.log(data);
                setValue('');
            })
            .catch(err => alert(err.message)); 
    };    

    const removeNote = (note: INote) => {
        deleteNote(note.id);
        getNotes();
    };

    useEffect(() => {
        getNotes();
    }, [value]);
  
    async function getNotes() {
        fetchNotes()
            .then(data => setNotes(data.rows))
            .catch(err => alert(err.message));
    }

   
    return (
        // <div className="wrapper" style={{width: '100%', height: '100vh', background: '#222222'}}>
            <Container style={{width: '75%'}}>
                <Form className="d-flex justify-content-between mt-3">
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название книги"}
                        style={{marginRight: 10}}
                    />
                    <Button variant={"outline-dark"} onClick={addNote}>Добавить</Button>
                </Form>

                <List 
                    items={notes} 
                    renderItem={(note: INote) => 
                        <NoteItem 
                            onClick={(note) => removeNote(note)} 
                            note={note} 
                            key={note.id} 
                        />
                    } 
                />
            </Container>            
        // </div>
    );
});

export default NotesPage;

// style={{marginRight: 10, border: 'none', borderBottom: '1px solid whitesmoke', background: 'none', color: 'whitesmoke'}}