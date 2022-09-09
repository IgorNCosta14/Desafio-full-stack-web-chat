import { Chat } from './components/Chat'
import './global.css'
import styles from './App.module.css'

function App() {

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <Chat />
      </div>
    </div>
  )
}

export default App
