import { FC, useEffect } from 'react'
import { Alert, Box, Button, Grid, Loader, PasswordInput, TextInput, Title, useMantineTheme } from '@mantine/core'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../types/AppDispatch'
import { signUp, verifyUser } from '../../redux/slices/authSlice'
import { RootState } from '../../types/RootState'
import { RequestState } from '../../types/RequestState'
import { AlertCircle } from 'tabler-icons-react'
import { User } from '../../types/User'
import { useForm, yupResolver } from '@mantine/form'
import { SignUpSchema } from '../../utils/validation'

const SignUp: FC = () => {
  const theme = useMantineTheme()
  const [search, _] = useSearchParams()

  const dispatch = useDispatch<AppDispatch>()
  const verifyState = useSelector<RootState, RequestState>((state) => state.auth.verify)
  const user = useSelector<RootState, User | null>((state) => state.auth.user)
  const signUpState = useSelector<RootState, RequestState>((state) => state.auth.signUp)

  const navigate = useNavigate()

  const signUpForm = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validate: yupResolver(SignUpSchema)
  })

  useEffect(() => {
    const claim = search.get('claim')
    if (claim) {
      dispatch(verifyUser(claim))
    }
  }, [dispatch, search])

  useEffect(() => {
    if (verifyState.success) {
      signUpForm.setValues({
        firstName: user ? user.firstName : '',
        lastName: user ? user.lastName : '',
        email: user ? user.email : '',
        password: '',
        confirmPassword: ''
      })
    }
  }, [verifyState.success])

  useEffect(() => {
    if (signUpState.success) {
      navigate('/login')
    }
  }, [navigate, signUpState.success])

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
        verifyState.loading && <Loader variant='bars' size={50} color={theme.colors.brand[0]} />
      }
      {
        verifyState.success && (
          <form
            onSubmit={signUpForm.onSubmit((values) => dispatch(signUp({ ...values, userId: user ? user?.userId.toString() : -1 })))}
            noValidate
          >
            {
              signUpState.error !== false && (
                <Alert icon={<AlertCircle size={16} />} title={signUpState.error} mb={12} color="red">
            Something terrible happened! You made a mistake and there is no going back, your data was lost forever!
                </Alert>
              )
            }
            <Grid>
              <Grid.Col xs={12}>
                <Title
                  order={2}
                  sx={{
                    fontFamily: theme.fontFamily,
                    color: theme.colors.brand[1]
                  }}
                >
              Sign Up
                </Title>
              </Grid.Col>
              <Grid.Col sm={6}>
                <TextInput
                  label='Your First Name'
                  placeholder='Enter First Name...'
                  autoComplete='first-name'
                  {...signUpForm.getInputProps('firstName')}
                />
              </Grid.Col>
              <Grid.Col sm={6}>
                <TextInput
                  label='Your Last Name'
                  placeholder='Enter Last Name...'
                  autoComplete='last-name'
                  {...signUpForm.getInputProps('lastName')}
                />
              </Grid.Col>
              <Grid.Col sm={12}>
                <TextInput
                  label='Your Email Address'
                  placeholder='Enter Email Address...'
                  type='email'
                  autoComplete='username'
                  {...signUpForm.getInputProps('email')}
                />
              </Grid.Col>
              <Grid.Col sm={12}>
                <PasswordInput
                  label='Password'
                  placeholder='Enter Password...'
                  autoComplete='new-password'
                  {...signUpForm.getInputProps('password')}
                />
              </Grid.Col>
              <Grid.Col sm={12}>
                <PasswordInput
                  label='Confirm Password'
                  placeholder='Enter Password Again...'
                  autoComplete='new-password'
                  {...signUpForm.getInputProps('confirmPassword')}
                />
              </Grid.Col>
              <Grid.Col sm={12}>
                <Button
                  loading={signUpState.loading}
                  fullWidth
                  type='submit'
                  variant='filled'
                  sx={{
                    backgroundColor: theme.colors.brand[2]
                  }}
                >
              Sign Up
                </Button>
              </Grid.Col>
            </Grid>
          </form>
        )
      }
      {
        verifyState.error !== false && (
          <Alert icon={<AlertCircle size={16} />} title={verifyState.error} mb={12} color="red">
            Something terrible happened! You made a mistake and there is no going back, your data was lost forever!
          </Alert>
        )
      }
    </Box>
  )
}

export default SignUp