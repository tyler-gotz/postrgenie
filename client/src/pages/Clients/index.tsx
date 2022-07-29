import React, { useEffect, useState } from 'react'
import PrivateRoute from '../../components/PrivateRoute'
import { ActionIcon, Alert, Button, Group, Table, Title, useMantineTheme } from '@mantine/core'
import { AlertCircle, Pencil, Plus, X } from 'tabler-icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { Client } from '../../types/Client'
import { RootState } from '../../types/RootState'
import { RequestState } from '../../types/RequestState'
import ClientModal from '../../components/ClientModal'
import { Company } from '../../types/Company'
import { AppDispatch } from '../../types/AppDispatch'
import { addClient, deleteClient, resetAddAndUpdate, updateClient } from '../../redux/slices/clientSlice'
import { showNotification } from '@mantine/notifications'

const Clients: React.FC = () => {
  const [opened, setOpened] = useState(false)
  const [clientId, setClientId] = useState(-1)
  const [client, setClient] = useState<{ name: string }>({
    name: ''
  })
  const [modalType, setModalType] = useState('Add')

  const theme = useMantineTheme()

  const dispatch = useDispatch<AppDispatch>()
  const company = useSelector<RootState, Company | null>((state) => state.user.company)
  const clients = useSelector<RootState, Client[]>((state) => state.client.clients)
  const clientState = useSelector<RootState, RequestState>((state) => state.client.getClients)
  const addClientState = useSelector<RootState, RequestState>((state) => state.client.addClient)
  const deleteClientState = useSelector<RootState, RequestState>((state) => state.client.deleteClient)
  const updateClientState = useSelector<RootState, RequestState>((state) => state.client.updateClient)

  const handleOpenModal = (id: number | undefined) => {
    dispatch(resetAddAndUpdate())
    if (id) {
      setClientId(id)
      const fetchedClient = clients.find((c) => c.clientId === id)
      if (fetchedClient) {
        setClient({
          name: fetchedClient?.name
        })
      }
      setModalType('Update')
    } else {
      setClient({ name: '' })
      setModalType('Add')
    }
    
    setOpened(true)
  }

  const handleCloseModal = () => {
    setOpened(false)
  }

  const handleAddClient = (values: { name: string }) => {
    if (company) {
      dispatch(addClient({
        name: values.name,
        company: company?.companyId.toString()
      }))
    }
  }

  const handleUpdateClient = (values: { name: string }) => {
    dispatch(updateClient({
      clientId,
      name: values.name
    }))
  }

  useEffect(() => {
    if (addClientState.success) {
      showNotification({
        title: 'Added New Client',
        message: 'A new client was added. Great Job.',
        color: 'teal'
      })
    }

    if (deleteClientState.success) {
      showNotification({
        title: 'Removed Client',
        message: 'Client was removed',
        color: 'teal'
      })
    }

    if (updateClientState.success) {
      showNotification({
        title: 'Updated Client',
        message: 'Client was updated',
        color: 'teal'
      })
    }
  }, [addClientState.success, deleteClientState.success, updateClientState.success])

  const handleDeleteClient = (clientId: number) => {
    dispatch(deleteClient(clientId))
  }
  
  return (
    <PrivateRoute>
      <>
        <Group position='apart'>
          <Title 
            order={1} 
            sx={{ 
              fontFamily: theme.fontFamily, 
              color: theme.colors.brand[1] 
            }}>
          Clients
          </Title>
          <Button
            style={{ 
              marginTop: 14, 
              backgroundColor: theme.colors.brand[0] 
            }}
            onClick={() => handleOpenModal(undefined)}
          >
            Add Client
            <Plus size={16} />
          </Button>
        </Group>
        <div style={{ marginTop: 10 }}>
          {
            clientState.loading && <div />
          }
          {
            clientState.success && (
              <>
                {
                  clients.length > 0
                    ? (
                      <Table
                        striped
                        fontSize='lg'
                      >
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            clients.map((client) => (
                              <tr key={`client-${client.clientId}`}>
                                <td>{client.name}</td>
                                <td>
                                  <Group>
                                    <ActionIcon 
                                      variant='filled' 
                                      color='yellow'
                                      onClick={() => handleOpenModal(client.clientId)}
                                    >
                                      <Pencil />
                                    </ActionIcon>
                                    <ActionIcon 
                                      variant='filled' 
                                      color='red' 
                                      onClick={() => handleDeleteClient(client.clientId)}
                                    >
                                      <X />
                                    </ActionIcon>
                                  </Group>
                                </td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </Table>
                    )
                    : (
                      <Alert icon={<AlertCircle size={16} />} title="No Clients" color="blue">
                        There are currently no clients. Please click the button on the right to add new clients!
                      </Alert>
                    )
                }
              </>
            )
          }
        </div>
        <ClientModal
          modalType={modalType}
          open={opened}
          onClose={handleCloseModal}
          client={client}
          addClient={handleAddClient}
          addClientState={addClientState}
          updateClient={handleUpdateClient}
          updateClientState={updateClientState}
        />
      </>
    </PrivateRoute>
  )
}

export default Clients