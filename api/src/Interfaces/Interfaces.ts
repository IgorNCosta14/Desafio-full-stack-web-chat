export interface IMessage {
  id: string;
  userId: string;
  message: string;
  date: string;
}

export interface IDeleteMessage {
  id: string;
  adminId: string;
}
