import React from 'react';
import { Button, Card } from 'react-bootstrap';
// import { CSSTransition } from 'react-transition-group';

import { INote } from '../types/types';

// import './transition.sass';

interface NoteItemProps {
    note: INote;
    onDelete: (note: INote) => void;
    onEdit: (note: INote) => void;
};


const NoteItem: React.FC<NoteItemProps> = ({note, onDelete, onEdit}) => {
    return (
        // <CSSTransition key={note.id} timeout={500} classNames="transition" >
            <Card 
                className="d-flex justify-content-between shadow transition" 
                style={{padding: 10, marginTop: 15, flexDirection: 'row', fontSize: 18, lineHeight: '35px'}}
            >
                <div>{note.name}</div>
                {/* <div><input type="checkbox" />  {note.name}</div> */}
                {/* <div>{note.id}. {note.name} - создана пользователем {note.userId}</div> */}
                <div>
                    <Button 
                        variant={"outline-secondary"}
                        style={{marginRight: 10}}
                        onClick={() => onEdit(note)}
                        >Редактировать
                    </Button>
                    <Button 
                        variant={"outline-danger"}
                        onClick={() => onDelete(note)}
                        >Удалить
                    </Button>
                </div>
            </Card>
        // </CSSTransition>        
    );
};

export default NoteItem;