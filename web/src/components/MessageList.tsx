import styles from './MessageList.module.css';

interface Message {
    user: string,
    message: string,
    date: string
}

interface Messages {
    messages: Message[]
}

export function MessageList(messages: Messages) {
    return(
        <div className={styles.messagesBox}>
            {messages.messages.map((message) => {
                return (
                    <div className={styles.message}>
                        <div>
                            <strong>{message.user}:</strong>
                            <span>{message.message}</span>
                        </div>
                        <span>{message.date}</span>
                    </div>
                )
            })}
        </div>
    )
}