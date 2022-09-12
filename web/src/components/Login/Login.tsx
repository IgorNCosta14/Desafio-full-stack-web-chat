import { ChangeEvent, FormEvent, useState, KeyboardEvent, useEffect } from "react";
import { ILoginProps, IUser } from "../../Interfaces/Interfaces";
import styles from "./Login.module.css";

export function Login({ handleLogin }: ILoginProps) {
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    document.title = "WebChat"
  }, [])

  function handleSendName(event: ChangeEvent<HTMLTextAreaElement>) {
    setName(event.target.value);
  }

  function login(event: FormEvent) {
    event.preventDefault();

    const newUser: IUser = {
      userName: name,
      isUserAdmin: isAdmin,
    };

    handleLogin(newUser);
  }

  const loginKeyPressHandler = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {

      login(event)
    }
  };

  return (
    <div>
      <h2>Web Chat</h2>
      <form className={styles.loginBox}>
        <textarea
          placeholder="Nome de usuário"
          value={name}
          onChange={handleSendName}
          onKeyPress={loginKeyPressHandler}
          maxLength={18}
          required
        />
        <div className={styles.Wrapper}>
          <button onClick={login}>Entrar</button>
          <div className={styles.inputAdmin}>
            <span>Admin</span>

            <input
              id={"checkBox"}
              onChange={() => setIsAdmin(!isAdmin)}
              type="checkbox"
            />
            <label htmlFor={"checkBox"}></label>
          </div>
        </div>
      </form>
    </div>
  );
}
