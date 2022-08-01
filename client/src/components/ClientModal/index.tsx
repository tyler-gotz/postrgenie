import { FC, useEffect } from 'react'
import { Alert, Button, Group, Modal, TextInput, useMantineTheme } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { ClientSchema } from '../../utils/validation'
import { RequestState } from '../../types/RequestState'
import { AlertCircle } from 'tabler-icons-react'

interface Props {
    modalType: string
    open: boolean
    onClose: () => void
    client: { name: string }
    addClient: (values: { name: string }) => void
    addClientState: RequestState,
    updateClient: (values: { name: string }) => void
    updateClientState: RequestState
}

const ClientModal: FC<Props> = ({ modalType, open, onClose, client, addClient, addClientState, updateClient, updateClientState }) => {
  const theme = useMantineTheme()

  const clientForm = useForm({
    initialValues: {
      name: client.name
    },
    validate: yupResolver(ClientSchema)
  })

  useEffect(() => {
    if (open) {
      clientForm.setFieldValue('name', client.name)
    }
  }, [open])
  
  const closeModal = () => {
    onClose()
    clientForm.reset()
  }

  useEffect(() => {
    if (addClientState.success || updateClientState.success) {
      onClose()
      clientForm.reset()
    }
  }, [addClientState.success, onClose, updateClientState.success])

  return (
    <Modal
      opened={open}
      onClose={closeModal}
      title={`${modalType} Client`}
    >
      {
        addClientState.error != false && (
          <Alert icon={<AlertCircle size={16} />} title={addClientState.error} mb={12} color="red">
            Something terrible happened! You made a mistake and there is no going back, your data was lost forever!
          </Alert>
        )
      }
      {
        updateClientState.error != false && (
          <Alert icon={<AlertCircle size={16} />} title={updateClientState.error} mb={12} color="red">
            Something terrible happened! You made a mistake and there is no going back, your data was lost forever!
          </Alert>
        )
      }
      <form
        noValidate
        onSubmit={clientForm.onSubmit((values) => {
          if (modalType === 'Add') {
            addClient(values)
          } else {
            updateClient(values)
          }
        })}
      >
        <TextInput
          label='Name of Client'
          placeholder='Enter Name...'
          {...clientForm.getInputProps('name')}
        />
        <Group position='right'>
          <Button
            type='submit'
            sx={{
              marginTop: 15,
              backgroundColor: theme.colors.brand[0]
            }}
            loading={addClientState.loading || updateClientState.loading}
          >
            {modalType}
          </Button>
        </Group>
      </form>
    </Modal>
  )
}

export default ClientModal