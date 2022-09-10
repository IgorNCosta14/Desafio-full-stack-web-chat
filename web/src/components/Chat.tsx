import { ChangeEvent, FormEvent, useState } from "react";
import styles from './Chat.module.css';
import io from 'socket.io-client';
import { MessageList } from "./MessageList";
import { format } from 'date-fns';
import { v4 as uuidV4 } from 'uuid';
import axios from "axios";

const socket = io("http://localhost:3001", {
    withCredentials: false,
  });


interface User {
    userName: string;
    isUserAdmin: boolean;
}

interface Message {
    id: string;
    userId: string;
    user: string;
    message: string;
    date: string;
}

interface IDeleteMessage {
    id: string;
    adminId: string;
}

export function Chat() {
    const [ name ,setName ] = useState('');
    const [ isAdmin, setIsAdmin ] = useState(false);
    const [ user, setUser ] = useState<User>({userName: "", isUserAdmin: false});
    const [ message, setMessage ] = useState('');
    const [ messages, setMessages ] = useState<Message[]>([]);
    const [ socketId, setSocketId ] = useState('')

    function handleGetName(event: ChangeEvent<HTMLTextAreaElement>) {
        setName(event.target.value)
    }

    function login(event: FormEvent) {
        event.preventDefault()
        setName('')
        setMessage('')

        const newUser: User = {
            userName: name,
            isUserAdmin: isAdmin
        }

        socket.emit("joinChat", newUser.userName)
        
        setUser(newUser)
    }

    function handleSetMessage(event: ChangeEvent<HTMLTextAreaElement>) {
        setMessage(event.target.value)
    }

    function sendMessage(event: FormEvent) {
        event.preventDefault()

        const addNewMessage = messages;

        const newMessage: Message = {
            id: uuidV4(),
            userId: socketId,
            user: user.userName,
            message: message,
            date: format(new Date, "dd'/'MM'/'Y 'às' HH:mm'h'")
        }

        addNewMessage.push(newMessage);

        socket.emit("sendMessage", newMessage)
        setMessage('')
    }

    function deleteMessage(id: string) {
        const data: IDeleteMessage = {
            id,
            adminId: socketId
        }

        socket.emit("deleteMessage", data)
    }

    function handleDownload() {
        axios({
            url: 'http://localhost:3001/download',
            method: 'GET',
            responseType: 'blob',
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute('download', 'deleted_messages.txt');
            setTimeout(function() {
                document.body.appendChild(link);
                link.click();
            }, 200)
          })
          .catch(function (error) {
            console.log(error);
            alert(
              "Sorry, there was an error processing your request. Please check the dates of your report and try again!"
            );
          });
    }

    socket.on("previousMessages", (previousMessages) => {
        setMessages(previousMessages);
    })

    socket.on("receivedMessage", (receivedMessage) => {
        setMessages(receivedMessage);
    })

    socket.on("sendId", (sendId) => {
        setSocketId(sendId)
    })

    return (
        user.userName === "" ? 
            <div className={styles.
                container}>
                <h2>Web Chat</h2>
                <form className={styles.loginBox}>
                    <textarea
                        placeholder="Nome de usuário"
                        value={name}
                        onChange={handleGetName}
                        maxLength={18}
                        required
                    />
                    <div className={styles.Wrapper}>
                        <button onClick={login}>Entrar</button>
                        <div className={styles.inputAdmin}>
                            <span>Admin</span>
                            
                            <input id={"checkBox"} onChange={() => setIsAdmin(!isAdmin)} type="checkbox" />
                            <label htmlFor={"checkBox"}></label>
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
                            isAdmin={isAdmin}
                            onDeleteMessage={deleteMessage}
                            handleDownload={handleDownload}
                        />
                    </div>
                    <textarea 
                        className={styles.messageTextArea}
                        value={message}
                        onChange={handleSetMessage}
                        placeholder="Digite sua mensagem"
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