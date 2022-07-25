import React, { useEffect } from 'react'
import { Alert, Box, Button, Grid, PasswordInput, TextInput, Title, useMantineTheme } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { RegisterSchema } from '../../utils/validation'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../types/AppDispatch'
import { RootState } from '../../types/RootState'
import { RequestState } from '../../types/RequestState'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../redux/slices/authSlice'
import { AlertCircle } from 'tabler-icons-react'

const Register: React.FC = () => {
  const theme = useMantineTheme()

  const dispatch = useDispatch<AppDispatch>()
  const registerState = useSelector<RootState, RequestState>((state) => state.auth.register)
  const navigate = useNavigate()

  const registerForm = useForm({
    initialValues: {
      companyName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    schema: yupResolver(RegisterSchema)
  })

  useEffect(() => {
    if (registerState.success) {
      navigate('/login')
    }
  }, [navigate, registerState.success])

  return (
    <Box
      sx={{
        padding: '1.5rem',
        width: '100%',
        maxWidth: '36rem',
        margin: '0 auto',
        border: '1px solid #F61067',
        borderRadius: '5px',
        backgroundColor: theme.white
      }}
    >
      {
        registerState.error != false && (
          <Alert icon={<AlertCircle size={16} />} title={registerState.error} mb={12} color="red">
            Something terrible happened! You made a mistake and there is no going back, your data was lost forever!
          </Alert>
        )
      }
      <form 
        noValidate
        onSubmit={registerForm.onSubmit((values) => dispatch(registerUser(values)))}
      >
        <Grid>
          <Grid.Col xs={12}>
            <Title 
              order={2} 
              sx={{ 
                fontFamily: theme.fontFamily, 
                color: theme.colors.brand[1] 
              }}>
                Register New Company
            </Title>
          </Grid.Col>
          <Grid.Col sm={12}>
            <TextInput
              label="Your Company Name"
              placeholder="Enter Company Name..."
              {...registerForm.getInputProps('companyName')} 
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <TextInput
              label="Your First Name"
              placeholder="Enter First Name..."
              autoComplete="first-name"
              {...registerForm.getInputProps('firstName')} 
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <TextInput
              label="Your Last Name"
              placeholder="Enter Last Name..."
              autoComplete="last-name"
              {...registerForm.getInputProps('lastName')} 
            />
          </Grid.Col>
          <Grid.Col sm={12}>
            <TextInput
              label="Your Email Address"
              placeholder="Enter Email Address..."
              type="email"
              autoComplete="username"
              {...registerForm.getInputProps('email')} 
            />
          </Grid.Col>
          <Grid.Col sm={12}>
            <PasswordInput
              label="Password"
              placeholder="Enter Password..."
              autoComplete="new-password"
              {...registerForm.getInputProps('password')} 
            />
          </Grid.Col>
          <Grid.Col sm={12}>
            <PasswordInput
              label="Confirm Password"
              placeholder="Enter Password Again..."
              autoComplete="new-password"
              {...registerForm.getInputProps('confirmPassword')}
            />
          </Grid.Col>
          <Grid.Col sm={12}>
            <Button
              loading={registerState.loading}
              fullWidth
              type="submit"
              variant="filled"
              sx={{
                backgroundColor: theme.colors.brand[2],
              }}
            >
              Register
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </Box>
  )
}

export default Register