import React, { useState } from "react"
import * as yup from 'yup'
import useYup from '@usereact/use-yup'
import logo from "./logo.svg"
import "./App.css"

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
})

function App() {
  const [values, setValues] = useState({
    name: '',
    email: '',
  })
  const { errors } = useYup(values, validationSchema, {
    validateOnChange: true
  })
  console.log('errors: ', errors)

  const handleChange = e => {
    const { name, value } = e.currentTarget
    setValues(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <h3>Form</h3>
        <input
          placeholder="name"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        <input
          placeholder="name"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default App
