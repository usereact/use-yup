# useYup

> react hook for yup validations

[![NPM](https://img.shields.io/npm/v/@usereact/use-yup.svg)](https://www.npmjs.com/package/@usereact/use-yup)

## Install

```bash
npm install --save @usereact/use-yup
```

## Usage

``tsx
import React, { useState } from 'react'
import useYup from '@usereact/use-yup'

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
})

function Example() {
  const [values, setValues] = useState({
    name: '',
    email: '',
  })

  const { errors, validate } = useYup(values, validationSchema, {
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
    <form>
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
    </form>
  )
}
```

## License

MIT © [JuHwon](https://github.com/JuHwon)
