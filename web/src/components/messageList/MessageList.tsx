import styles from "./MessageList.module.css";
import { Trash } from "phosphor-react";
import { FormEvent } from "react";
import { IMessageListProps } from "../../Interfaces/Interfaces";

export function MessageList({
  messages,
  isAdmin,
  onDeleteMessage,
  handleDownload,
}: IMessageListProps) {
  function deleteMessage(event: FormEvent, id: string) {
    event.preventDefault();
    onDeleteMessage(id);
    handleDownload();
  }

  return (
    <div className={styles.messagesBox}>
      {messages.map((message) => {
        return isAdmin === true ? (
          <div key={message.id} className={styles.message}>
            <div className={styles.userMessage}>
              <strong>{message.user}: </strong>
              <span className={styles.messageText}>{message.message}</span>
            </div>
            <div className={styles.messageUtil}>
              <span>{message.date}</span>
              <button
                className={styles.trash}
                onClick={(event) => deleteMessage(event, message.id)}
              >
                <Trash size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div key={message.id} className={styles.message}>
            <div className={styles.userMessage}>
              <strong>{message.user}: </strong>
              <span className={styles.messageText}>{message.message}</span>
            </div>
            <span>{message.date}</span>
          </div>
        );
      })}
    </div>
  );
}
