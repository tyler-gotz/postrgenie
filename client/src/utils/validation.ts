import * as Yup from 'yup'

export const RegisterSchema = Yup.object().shape({
  companyName: Yup.string().required('This field is required.'),
  firstName: Yup.string().required('This field is required.'),
  lastName: Yup.string().required('This field is required.'),
  email: Yup.string().email('Please enter valid email.').required('This field is required.'),
  password: Yup.string().min(8, 'Password too short.').test('isValidPass', 'Password must contain at least 1 Uppercase letter, 1 Lowercase letter, 1 number, and 1 symbol (!@#%&)', (value) => {
    if (value) {
      const hasUpperCase = /[A-Z]/.test(value)
      const hasLowerCase = /[a-z]/.test(value)
      const hasNumber = /[0-9]/.test(value)
      const hasSymbol = /[!@#%&]/.test(value)
      let validConditions = 0
      const numberOfMustBeValidConditions = 3
      const conditions = [hasLowerCase, hasUpperCase, hasNumber, hasSymbol]
      conditions.forEach((condition) =>
        condition ? validConditions++ : null
      )
      if (validConditions >= numberOfMustBeValidConditions) {
        return true
      }
      return false
    }
    return false
  })
    .required('This field is required.'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match.').required('This field is required.')
})

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Please enter valid email.').required('This field is required.'),
  password: Yup.string().required('This field is required.')
})

export const ClientSchema = Yup.object().shape({
  name: Yup.string().required('This field is required.')
})

export const UserSchema = Yup.object().shape({
  firstName: Yup.string().required('This field is required.'),
  lastName: Yup.string().required('This field is required.'),
  email: Yup.string().required('This field is required.'),
  userType: Yup.string().required('This field is required.'),
  client: Yup.string().when('userType', {
    is: (val: string) => val === 'CLIENT_USER',
    then: (schema) => schema.required('This field is required.')
  })
})

export const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required('This field is required.'),
  lastName: Yup.string().required('This field is required.'),
  email: Yup.string().email('Please enter valid email.').required('This field is required.'),
  password: Yup.string().min(8, 'Password too short.').test('isValidPass', 'Password must contain at least 1 Uppercase letter, 1 Lowercase letter, 1 number, and 1 symbol (!@#%&)', (value) => {
    if (value) {
      const hasUpperCase = /[A-Z]/.test(value)
      const hasLowerCase = /[a-z]/.test(value)
      const hasNumber = /[0-9]/.test(value)
      const hasSymbol = /[!@#%&]/.test(value)
      let validConditions = 0
      const numberOfMustBeValidConditions = 3
      const conditions = [hasLowerCase, hasUpperCase, hasNumber, hasSymbol]
      conditions.forEach((condition) =>
        condition ? validConditions++ : null
      )
      if (validConditions >= numberOfMustBeValidConditions) {
        return true
      }
      return false
    }
    return false
  })
    .required('This field is required.'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match.').required('This field is required.')
})