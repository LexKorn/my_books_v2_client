import React, { useState, useEffect, useContext } from 'react';
import {Form, Container, Spinner} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import {Helmet} from "react-helmet";

import { INote } from '../../types/types';
import List from '../../components/List/List';
import NoteItem from '../../components/NoteItem';
import {createNote, deleteNote, fetchNotes} from '../../http/noteAPI';
import ModalNote from '../../components/Modals/ModalNote';
import { Context } from '../../index';

import './notesPage.sass';


const NotesPage: React.FC = observer(() => {
    const {library} = useContext(Context);
    const [value, setValue] = useState<string>('');
    const [notes, setNotes] = useState<INote[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(false);
    const [idNote, setIdNote] = useState<number>(0);

    useEffect(() => {
        getNotes();
    }, [value, visible]);

    async function getNotes() {
        fetchNotes()
            .then(data => setNotes(data))
            .then(() => library.setToggleScroll())
            .catch(err => alert(err.message))
            .finally(() => setLoading(false));
    }

    const addNote = () => {
        createNote(value)
            .then(() => setValue(''))
            .catch(err => alert(err.message)); 
    };    

    const removeNote = (note: INote) => {
        if (window.confirm('Вы действительно хотите удалить заметку?')) {
            deleteNote(note.id);
            getNotes();
        }
    };

    const editNote = (note: INote) => {
        setIdNote(note.id);
        setVisible(true);
    };
      
    const keyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();           
            if (!value.trim()) {               
                return alert('Поле обязательно для заполнения');
            }
            addNote();
        }
    };

    if (loading) {
        return <Spinner animation={"border"}/>
    }

   
    return (
        <Container>
            <Helmet>
                <title>Notes Page</title>
                <meta name="description" content="Добавить книгу к прочтению" />
            </Helmet>
            <h1 style={{textAlign: 'center'}}>Список книг, которые планирую прочитать:</h1>
            <Form className="d-flex justify-content-between mt-5 mb-5 notes-form">
                <Form.Control
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    // @ts-ignore
                    onKeyPress={e => keyPress(e)}
                    placeholder={"Добавить книгу"}
                />
            </Form>            
            <List 
                items={notes} 
                renderItem={(note: INote) => 
                    <NoteItem 
                        onDelete={(note) => removeNote(note)} 
                        onEdit={(note) => editNote(note)} 
                        note={note} 
                        key={note.id} 
                    />
                } 
            />
            <ModalNote show={visible} onHide={() => setVisible(false)} idNote={idNote} />            
        </Container>            
    );
});

export default NotesPage;