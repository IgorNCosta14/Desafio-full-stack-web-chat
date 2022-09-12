import { ChangeEvent, FormEvent, useEffect, useState, KeyboardEvent } from "react";
import { IChatProps } from "../../Interfaces/Interfaces";
import styles from "./Chat.module.css";

export function Chat({ sendMessage }: IChatProps) {
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    document.title = "Chat"
  }, [])

  function handleSetMessage(event: ChangeEvent<HTMLTextAreaElement>) {
    setMessageText(event.target.value);
  }

  function handleSendMessage(event: FormEvent) {
    event.preventDefault();
 
    sendMessage(messageText);
    setMessageText("")
  }

  const ChatKeyPressHandler = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      handleSendMessage(event)
    }

    if (event.key === 'Enter' && event.shiftKey) {
      
      event.preventDefault();
      let msgNewText =  `${messageText}\n`  ;
      setMessageText(msgNewText);
    }    
  };

  return (
    <div className={styles.chatBox}>
      <textarea
        className={styles.messageTextArea}
        value={messageText}
        onChange={handleSetMessage}
        placeholder="Digite sua mensagem"
        onKeyPress={ChatKeyPressHandler}
      />
      <button type="submit" onClick={handleSendMessage}>
        Enviar
      </button>
    </div>
  );
}
