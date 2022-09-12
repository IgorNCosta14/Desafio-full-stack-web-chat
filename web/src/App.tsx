import { WebChat } from "./components/WebChat/WebChat";
import "./global.css";
import styles from "./App.module.css";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <WebChat />
      </div>
    </div>
  );
}

export default App;
