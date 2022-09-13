import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
  KeyboardEvent,
} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { ILoginProps, IUser } from '../../Interfaces/Interfaces';
import styles from './Login.module.css';

export function Login({ handleLogin }: ILoginProps) {
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    document.title = 'WebChat';
  }, []);

  const customId = 'customLogin';

  const errorToast = () => {
    toast(`O nome do usuário deve ser preenchido`, {
      className: 'nameNotFilled-toast',
      draggable: true,
      position: toast.POSITION.TOP_CENTER,
      toastId: customId,
    });
  };

  function handleSetName(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function login(event: FormEvent) {
    event.preventDefault();

    if (name === '') {
      errorToast();
    }

    const newUser: IUser = {
      userName: name,
      isUserAdmin: isAdmin,
    };

    setName('');
    handleLogin(newUser);
  }

  const loginKeyPressHandler = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      login(event);
    }
  };

  return (
    <div className={styles.loginBox}>
      <div className={styles.title}>Sign In</div>
      <form className={styles.loginForm}>
        <div className={styles.inputs}>
          <div className={styles.inputContainer}>
            <label>
              <strong>Usuário</strong>
            </label>
            <input
              className={styles.userNameInput}
              type="text"
              name="uname"
              required
              placeholder="Nome de usuário"
              value={name}
              onChange={handleSetName}
              onKeyPress={loginKeyPressHandler}
              maxLength={14}
            />
            <ToastContainer />
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.inputAdmin}>
              <span>
                <strong>Admin</strong>
              </span>
              <input
                id={'checkBox'}
                onChange={() => setIsAdmin(!isAdmin)}
                type="checkbox"
              />
              <label htmlFor={'checkBox'}></label>
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <input type="submit" onClick={login} />
        </div>
      </form>
    </div>
  );
}
