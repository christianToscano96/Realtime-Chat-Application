import React from 'react';
import './input.css';

const Input = ({message, setMessage, sendMessage}) => (
    <form action="" className="form">
        <input type="text" 
               className="input"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
        <button className="sendButton" onClick={(event) => sendMessage(event)}>Enviar</button>
    </form>
);
 
export default Input;
