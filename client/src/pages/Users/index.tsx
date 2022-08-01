import { FC, useEffect, useState } from 'react'
import PrivateRoute from '../../components/PrivateRoute'
import { Group, Title, Button, useMantineTheme, Table, ActionIcon } from '@mantine/core'
import { Pencil, UserPlus, X } from 'tabler-icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../types/RootState'
import { User } from '../../types/User'
import UserModal from '../../components/UserModal'
import { AppDispatch } from '../../types/AppDispatch'
import { addUser, getRoles, resetAddAndUpdate } from '../../redux/slices/usersSlice'
import { Role } from '../../types/Role'
import { Client } from '../../types/Client'
import { RequestState } from '../../types/RequestState'
import { Company } from '../../types/Company'
import { UserForm } from '../../types/UserForm'

const Users: FC = () => {
  const [opened, setOpened] = useState(false)

  const theme = useMantineTheme()

  const dispatch = useDispatch<AppDispatch>()
  const company = useSelector<RootState, Company | null>((state) => state.user.company)
  const users = useSelector<RootState, User[]>((state) => state.users.users)
  const roles = useSelector<RootState, Role[]>((state) => state.users.roles)
  const clients = useSelector<RootState, Client[]>((state) => state.client.clients)
  const addUserState = useSelector<RootState, RequestState>((state) => state.users.addUser)

  const handleOpenModal = () => {
    dispatch(resetAddAndUpdate())
    setOpened(true)
  }

  const handleCloseModal = () => {
    setOpened(false)
  }

  const handleAddUser = (values: UserForm) => {
    if (company) {
      const { userType, client: clientName, ...rest } = values
      const role = roles.find((role) => role.name === userType)
      const userClient = clients.find((client) => client.name === clientName)
      
      dispatch(addUser({
        ...rest,
        company: company?.companyId.toString(),
        roleId: role?.roleId.toString(),
        clientId: userClient ? userClient.clientId.toString() : undefined
      }))
    }
  }

  useEffect(() => {
    dispatch(getRoles())
  }, [dispatch])

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
              Users
          </Title>
          <Button
            style={{ 
              marginTop: 14, 
              backgroundColor: theme.colors.brand[0] 
            }}
            onClick={() => handleOpenModal()}
          >
            Add User
            <UserPlus size={16} />
          </Button>
        </Group>
        <div style={{ marginTop: 10 }}>
          <Table striped fontSize='lg'>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>User Type</th>
                <th>Client</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user) => (
                  <tr key={`user-${user.userId}`}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.role?.name}</td>
                    <td>
                      {user.clientEmployee?.clientId === 0 ? '' : user.clientEmployee?.client.name}
                    </td>
                    <td>
                      <Group>
                        <ActionIcon 
                          variant='filled' 
                          color='yellow'
                          // onClick={() => handleOpenModal(client.clientId)}
                        >
                          <Pencil />
                        </ActionIcon>
                        <ActionIcon 
                          variant='filled' 
                          color='red' 
                          // onClick={() => handleDeleteClient(client.clientId)}
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
        </div>
        <UserModal 
          modalType='Add'
          open={opened}
          onClose={handleCloseModal}
          roles={roles}
          clients={clients}
          addUser={handleAddUser}
          addUserState={addUserState}
        />
      </>
    </PrivateRoute>
  )
}

export default Users