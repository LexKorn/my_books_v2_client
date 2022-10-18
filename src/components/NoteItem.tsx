import React from 'react';
import { Button, Card } from 'react-bootstrap';
// import randomColor from 'randomcolor';
// backgroundColor: `${randomColor({luminosity: 'light'})}`

import { INote } from '../types/types';

interface NoteItemProps {
    note: INote;
    onClick: (note: INote) => void;
};

const NoteItem: React.FC<NoteItemProps> = ({note, onClick}) => {
    return (
        <Card 
            className="d-flex justify-content-between shadow" 
            style={{padding: 10, marginTop: 15, flexDirection: 'row'}}
        >
            <div style={{fontSize: 18, lineHeight: '35px'}}>{note.id}. {note.name} - создана пользователем {note.userId}</div>
            <div>
                <Button 
                    variant={"outline-secondary"}
                    style={{marginRight: 10}}
                    onClick={() => onClick(note)}
                    >Редактировать
                </Button>
                <Button 
                    variant={"outline-danger"}
                    onClick={() => onClick(note)}
                    >Удалить
                </Button>
            </div>
        </Card>
    );
};

export default NoteItem;