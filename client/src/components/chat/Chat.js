import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
//components
import InfoBar from '../infoBar/InfoBar';
import Input from '../input/Input';
import Messages from '../Messages/Messages';

//css}
import './Chat.css';

let socket;

const Chat = ({location}) => {

    //state
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    //URL
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);

        //conexion 
        socket = io(ENDPOINT);

        //console.log(location.search);
        console.log(name, room);
        setName(name);
        setRoom(room);

        //console.log(socket);
        socket.emit('join', {name, room}, () => {
            
        });

        return () => {
            socket.emit('disconnect');

            socket.off();
        }

    }, [ENDPOINT, location.search]);


    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages]);

    //funcion para enviar mensages
    const sendMessage = (event) => {
        event.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(message, messages);
    return ( 
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
               
            </div>
        </div>

    );
}
 
export default Chat;