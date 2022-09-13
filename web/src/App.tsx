import { WebChat } from './components/WebChat/WebChat';
import './global.css';
import styles from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from './components/Header/Header';

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <WebChat />
    </div>
  );
}

export default App;
