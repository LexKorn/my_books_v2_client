import React from 'react';
import { Toast, Row, Col } from 'react-bootstrap';

interface MessageProps {
    text: string;
    show: boolean;
    setShow: (show: boolean) => void;
};

const Message: React.FC<MessageProps> = ({text, show, setShow}) => {

    return (
        <Row>
            <Col xs={6}>
                <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Header>
                    <strong className="me-auto">Сообщение</strong>
                </Toast.Header>
                <Toast.Body>{text}</Toast.Body>
                </Toast>
            </Col>
        </Row>
    );
};

export default Message;