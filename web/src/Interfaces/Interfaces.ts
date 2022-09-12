export interface IUser {
  userName: string;
  isUserAdmin: boolean;
}

export interface IMessage {
  id: string;
  userId: string;
  user: string;
  message: string;
  date: string;
}

export interface IMessageListProps {
  isAdmin: boolean;
  messages: IMessage[];
  onDeleteMessage: (id: string) => void;
  handleDownload: () => void;
}

export interface IDeleteMessage {
  id: string;
  adminId: string;
}

export interface ILoginProps {
  handleLogin: (newUser: IUser) => void;
}

export interface IChatProps {
  sendMessage: (messageText: string) => void;
}
