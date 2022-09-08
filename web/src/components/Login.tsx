import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./Login.module.css"
import io from 'socket.io-client'
import { MessageList } from "./MessageList";

const socket = io("http://localhost:3001")


interface User {
    userName: string,
    isUserAdmin: boolean
}

interface Message {
    user: string,
    message: string,
    date: string
}

export function Login() {
    const [ name ,setName ] = useState('');
    const [ isAdmin, setIsAdmin ] = useState(false);
    const [ user, setUser ] = useState<User>({userName: "", isUserAdmin: false});
    const [ message, setMessage ] = useState('');
    const [ messages, setMessages ] = useState<Message[]>([]);

    function handleGetName(event: ChangeEvent<HTMLTextAreaElement>) {
        setName(event.target.value)
    }

    function login(event: FormEvent) {
        event.preventDefault()

        const newUser: User = {
            userName: name,
            isUserAdmin: isAdmin
        }

        socket.emit("joinChat", newUser)
        
        setUser(newUser)
    }

    function handleSetMessage(event: ChangeEvent<HTMLTextAreaElement>) {
        setMessage(event.target.value)
    }

    function sendMessage(event: FormEvent) {
        event.preventDefault()

        const addNewMessage = messages;

        const dataNow = new Date();

        const newMessage: Message = {
            user: user.userName,
            message: message,
            date: dataNow.toString()
        }

        addNewMessage.push(newMessage);

        socket.emit("sendMessage", newMessage)
    }

    socket.on("previousMessages", (previousMessages) => {
        setMessages(previousMessages);
    })

    socket.on("receivedMessage", (receivedMessage) => {
        setMessages(receivedMessage);
    })

    return (
        user.userName === "" ? 
            <div>
                
                <form className={styles.loginBox}>
                    <textarea
                        value={name}
                        onChange={handleGetName}
                    />
                    <div className={styles.Wrapper}>
                        <button onClick={login}>Entrar</button>
                        <div className={styles.input}>
                            <span>Admin</span>
                            <input onChange={() => setIsAdmin(!isAdmin)} type="checkbox" />
                        </div>    
                    </div>   
                </form>
            </div>

        :
            
            <div className={styles.chatBox}>
                <form>
                    <div>
                        <MessageList 
                            messages={messages}
                        />
                    </div>
                    <textarea 
                        className={styles.messageTextArea}
                        value={message}
                        onChange={handleSetMessage}
                        placeholder="Digite seu mensagem"
                    />
                    <button 
                        type="submit" 
                        onClick={sendMessage}
                    >
                        Enviar
                    </button>
                </form>
            </div>
    )
}