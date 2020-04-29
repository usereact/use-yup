import { useState, useEffect } from 'react'

import { Schema, ValidationError } from 'yup'

type Values = {
  [field: string]: any
}

type ValidationErrors<T> = {
  [K in keyof T]?: T[K] extends object ? ValidationErrors<T[K]> : string
}

type ValidationResult<T> = {
  errors: ValidationErrors<T>,
  isValid: boolean,
}

type UseYupOptions = {
  validateOnChange?: boolean
}

function useYup<T extends Values>(
  values: T,
  validationSchema: Schema<any>,
  options: UseYupOptions = {}
) {
  const [errors, setErrors] = useState<ValidationErrors<T>>({})
  const isValid = Object.keys(errors).length === 0

  const validate = () =>
    validationSchema
      .validate(values, { abortEarly: false })
      .then(() => {
        return {} as ValidationErrors<T>
      })
      .catch((error: any) => {
        return yupToValidationErrors<T>(error)
      })
      .then(newErrors => {
        setErrors(newErrors)
        return {
          errors: newErrors,
          isValid: Object.keys(newErrors).length === 0
        } as ValidationResult<T>
      })

  useEffect(
    () => {
      options.validateOnChange && validate()
    },
    [values, validationSchema]
  )

  return {
    validate,
    errors,
    isValid,
  }
}

/**
 * Transform Yup errors to a ValidationErrors object
 */
function yupToValidationErrors<T extends Values>(
  yupError: ValidationError
): ValidationErrors<T> {
  let errors: any = {} as ValidationErrors<Values>
  if (yupError.inner.length === 0) {
    updateIn(errors, yupError.path, yupError.message)
    return errors
  }
  for (let err of yupError.inner) {
    updateIn(errors, err.path, err.message)
  }
  return errors
}

function updateIn(obj: any, path: string, value: any): any {
  const pathArray = path.split('.')
  let destinationObject = obj
  for (let i = 0; i < pathArray.length - 1; i++) {
    if (pathArray[i] in destinationObject === false) {
      destinationObject[pathArray[i]] = {}
    }
    if (RegExp(/\[([^)]+)\]/).exec(pathArray[i])) {
      const [relativePath, index] = pathArray[i].split('[')
      const p = Number(index.split(']')[0])

      if (!Array.isArray(destinationObject[relativePath])) {
        destinationObject[relativePath] = []
      }

      if (!isNaN(p)) {
        destinationObject[relativePath][p] = destinationObject[pathArray[i]]
      }
    }

    destinationObject = destinationObject[pathArray[i]]
  }
  destinationObject[pathArray[pathArray.length - 1]] = value
}

export default useYup
