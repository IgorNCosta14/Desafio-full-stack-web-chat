export interface IMessage {
  messageId: string;
  user: string;
  userId: string;
  message: string;
  date: string;
}

export interface IDeleteMessage {
  messageId: string;
  adminId: string;
}

export interface IDeletedMessages {
  messageId: string;
  userId: string;
  messageText: string;
}
