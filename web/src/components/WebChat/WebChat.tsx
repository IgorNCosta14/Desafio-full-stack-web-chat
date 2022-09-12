import { useState } from "react";
import styles from "./WebChat.module.css";
import io from "socket.io-client";
import { MessageList } from "../messageList/MessageList";
import { format } from "date-fns";
import { v4 as uuidV4 } from "uuid";
import axios from "axios";
import { IDeleteMessage, IMessage, IUser } from "../../Interfaces/Interfaces";
import { Login } from "../Login/Login";
import { Chat } from "../Chat/Chat";
import { toast, ToastContainer } from "react-toastify";
import { Login2 } from "../Login/Login2.component";

const socket = io("http://localhost:3001", {
  withCredentials: false,
});

export function WebChat() {
  const [user, setUser] = useState<IUser>({ userName: "", isUserAdmin: false });
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [socketId, setSocketId] = useState("");

  const customId = "custom-id-yes";

  const errorToast = () => {
    toast(`Perda de conexão! Recarregue ou tente mais tarde.`, {
      className: "connectionLost-toast",
      draggable: true,
      position: toast.POSITION.TOP_CENTER,
      toastId: customId
    })
  }

  function handleLogin(newUser: IUser) {
    socket.emit("joinChat", newUser.userName);

    if(socket.id === undefined) {
      setUser(({ userName: "", isUserAdmin: false }));

      window.location.reload(); 

      errorToast()
    } else (
      setUser(newUser)
    )
  }

  function sendMessage(messageText: string) {
    const addNewMessage = messages;

    const newMessage: IMessage = {
      id: uuidV4(),
      userId: socketId,
      user: user.userName,
      message: messageText,
      date: format(new Date(), "dd'/'MM'/'Y 'às' HH:mm"),
    };

    addNewMessage.push(newMessage);

    socket.emit("sendMessage", newMessage);
  }
 
  function deleteMessage(id: string) {
    const data: IDeleteMessage = {
      id,
      adminId: socketId,
    };

    socket.emit("deleteMessage", data);
  }

  function handleDownload() {
    axios({
      url: "http://localhost:3001/download",
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "deleted_messages.txt");
        setTimeout(function () {
          document.body.appendChild(link);
          link.click();
        }, 200);
      })
      .catch(function (error) {
        console.log(error);
        alert(
          "Sorry, there was an error processing your request. Please check the dates of your report and try again!"
        );
      });
  }

  socket.on("connect_error", (err) => {
    setUser({ userName: "", isUserAdmin: false })

    errorToast()

    socket.disconnect();
  });

  socket.on("previousMessages", (previousMessages) => {
    setMessages(previousMessages);
  });

  socket.on("receivedMessage", (receivedMessage) => {
    setMessages(receivedMessage);
  });

  socket.on("sendId", (sendId) => {
    setSocketId(sendId);
  });

  return user.userName === "" ? (
    <div>
      <Login 
        handleLogin={handleLogin}
      />
      {/* <Login2 /> */}
      <ToastContainer />
    </div>
  ) : (
    <div className={styles.chatBox}>
      <form>
        <MessageList
          messages={messages}
          isAdmin={user.isUserAdmin}
          onDeleteMessage={deleteMessage}
          handleDownload={handleDownload}
        />
        <Chat 
          sendMessage={sendMessage}
        />
      </form>
    </div>
  );
}