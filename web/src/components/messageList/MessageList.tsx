import { Trash } from 'phosphor-react';
import { FormEvent, useEffect, useRef } from 'react';
import { IMessageListProps } from '../../Interfaces/Interfaces';
import styles from './MessageList.module.css';

export function MessageList({
  messages,
  isAdmin,
  onDeleteMessage,
  handleDownload,
}: IMessageListProps) {
  const bottomRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function deleteMessage(event: FormEvent, MessageId: string) {
    event.preventDefault();
    onDeleteMessage(MessageId);
    handleDownload();
  }

  return (
    <div className={styles.messageBox}>
      <ul className={styles.messageList}>
        {messages.map((message) => {
          return isAdmin === true ? (
            <div key={message.messageId} className={styles.messageContainer}>
              <li className={styles.message}>
                <div className={styles.messageInfo}>
                  <div>
                    <strong>{message.user}</strong>
                  </div>
                  <div className={styles.dateAndAdmin}>
                    <div>{message.date}</div>
                  </div>
                </div>
                <div className={styles.messageText}>{message.message}</div>
              </li>
              <button
                className={styles.trash}
                onClick={(event) => deleteMessage(event, message.messageId)}
              >
                <Trash size={20} />
              </button>
              <div ref={bottomRef} />
            </div>
          ) : (
            <li key={message.messageId} className={styles.message}>
              <div className={styles.messageInfo}>
                <div>
                  <strong>{message.user}</strong>
                </div>
                <div className={styles.dateAndAdmin}>
                  <div>{message.date}</div>
                </div>
              </div>
              <div className={styles.messageText}>{message.message}</div>
              <div ref={bottomRef} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
