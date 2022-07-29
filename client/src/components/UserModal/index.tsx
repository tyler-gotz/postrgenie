import { FC, useEffect } from 'react'
import { Alert, Button, Grid, Group, Modal, Radio, Select, TextInput, useMantineTheme } from '@mantine/core'
import { Role } from '../../types/Role'
import { useForm, yupResolver } from '@mantine/form'
import { Client } from '../../types/Client'
import { UserSchema } from '../../utils/validation'
import { UserForm } from '../../types/UserForm'
import { RequestState } from '../../types/RequestState'
import { AlertCircle } from 'tabler-icons-react'

interface Props {
    modalType: string
    open: boolean
    onClose: () => void
    roles: Role[]
    clients: Client[]
    addUser: (values: UserForm) => void
    addUserState: RequestState
}

const UserModal: FC<Props> = ({ modalType, open, onClose, roles, clients, addUser, addUserState }) => {
  const theme = useMantineTheme()

  const userForm = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      userType: '',
      client: ''
    },
    validate: yupResolver(UserSchema)
  })

  const closeModal = () => {
    onClose()
  }

  useEffect(() => {
    if (open) {
      userForm.reset()
    }
  }, [open])

  useEffect(() => {
    if (addUserState.success) {
      onClose()
    }
  }, [addUserState.success, onClose])

  return (
    <Modal
      opened={open}
      onClose={closeModal}
      title={`${modalType} User`}
    >
      {
        addUserState.error != false && (
          <Alert icon={<AlertCircle size={16} />} title={addUserState.error} mb={12} color="red">
            Something terrible happened! You made a mistake and there is no going back, your data was lost forever!
          </Alert>
        )
      }
      <form
        noValidate
        onSubmit={userForm.onSubmit((values) => {
          addUser(values)
        })}
      >
        <Grid>
          <Grid.Col md={6}>
            <TextInput
              label='First Name'
              placeholder='Enter First Name...'
              {...userForm.getInputProps('firstName')}
            />
          </Grid.Col>
          <Grid.Col md={6}>
            <TextInput
              label='Last Name'
              placeholder='Enter Last Name...'
              {...userForm.getInputProps('lastName')}
            />
          </Grid.Col>
          <Grid.Col md={12}>
            <TextInput
              label='Email Address'
              placeholder='Enter Email Address...'
              {...userForm.getInputProps('email')}
            />
          </Grid.Col>
          <Grid.Col md={12}>
            <Radio.Group 
              label='User Type'
              {...userForm.getInputProps('userType')}
              value={userForm.values.userType}
              onChange={(value) => {
                userForm.setFieldValue('client', '')
                userForm.setFieldValue('userType', value)
              }}
            >
              {
                roles.map((role) => <Radio key={`userType-${role.roleId}`} value={role.name} label={role.name.replace('_', ' ')} />)
              }
            </Radio.Group>
          </Grid.Col>
          {
            userForm.values.userType === 'CLIENT_USER' && (
              <Grid.Col md={12}>
                <Select
                  label='Client'
                  placeholder='Select Client...'
                  data={
                    clients.map((client) => ({
                      value: client.name,
                      label: client.name
                    }))
                  }
                  {...userForm.getInputProps('client')}
                />
              </Grid.Col>
            )
          }
          <Grid.Col md={12}>
            <Group position='right'>
              <Button
                type='submit'
                sx={{
                  marginTop: 15,
                  backgroundColor: theme.colors.brand[0]
                }}
              >
                {modalType}
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </form>
    </Modal>
  )
}

export default UserModal