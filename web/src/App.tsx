import { Login } from './components/Login'
import './global.css'
import styles from './App.module.css'

function App() {

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <Login/>
      </div>
    </div>
  )
}

export default App
