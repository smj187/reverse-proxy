import { useEffect, useState } from "react"
import reactLogo from "./assets/react.svg"
import "./App.css"

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const loadWeatherFromServer = async () => {
      const data = await fetch("https://localhost:10000/sa/weatherforecast")
      console.log("data from service A", await data.json())
    }
    const loadWeatherFromEnvoy = async () => {
      const data = await fetch("https://localhost:10000/sb/weatherforecast")
      console.log("data from service B", await data.json())
    }

    loadWeatherFromServer()
    loadWeatherFromEnvoy()
  }, [])

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App

