import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = ({location}) => {

    //state
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
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

    return ( <p>DEsde chat</p>);
}
 
export default Chat;