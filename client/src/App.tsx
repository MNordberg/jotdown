import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div id='header'>
              <img src="/jotdown.svg" />
        <h1>Jotdown</h1>
      </div>
      <div id='main'>
        <div>Search bar</div>
        <div>Notes in a list...</div>
      </div>
      <div className='floating-action'>(off to the right) "Add note"</div>
    </>
  )
}

export default App
