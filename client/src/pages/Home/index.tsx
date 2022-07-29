import React from 'react'
import PrivateRoute from '../../components/PrivateRoute'
import { Alert, Button, Card, Grid, Image, Title, Text, useMantineTheme, Group } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../types/RootState'
import { User } from '../../types/User'
import { AlertCircle } from 'tabler-icons-react'
import { Company } from '../../types/Company'
import Clients from '../../assets/clients.jpg'
import Campaigns from '../../assets/campaigns.jpg'
import Users from '../../assets/users.jpg'
import { Client } from '../../types/Client'

const Home: React.FC = () => {
  const theme = useMantineTheme()

  const user = useSelector<RootState, User | null>((state) => state.user.user)
  const company = useSelector<RootState, Company | null>((state) => state.user.company)
  const clients = useSelector<RootState, Client[]>((state) => state.client.clients)
  const users = useSelector<RootState, User[]>((state) => state.users.users)

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
            Welcome {user?.firstName} {user?.lastName}
          </Title>
          <Title 
            order={2} 
            sx={{ 
              fontFamily: theme.fontFamily, 
              color: theme.colors.brand[0] 
            }}>
            {company?.name}
          </Title>
        </Group>
        <Grid sx={{ marginTop: 10, marginBottom: 10 }}>
          <Grid.Col sm={4}>
            <Card shadow='sm' p='lg'>
              <Card.Section>
                <Image src={Clients} height={160} alt="Clients" />
              </Card.Section>
              <Text weight={500}>Clients</Text>
              <Text size="sm" style={{ lineHeight: 1.5 }}>
                There are currently {clients.length} clients at {company?.name}. Click on the button below to manage clients.
              </Text>
              <Button
                component={Link}
                to='/clients'
                fullWidth 
                style={{ 
                  marginTop: 14, 
                  backgroundColor: theme.colors.brand[0] 
                }}
              >
                Manage Clients
              </Button>
            </Card>
          </Grid.Col>
          <Grid.Col sm={4}>
            <Card shadow='sm' p='lg'>
              <Card.Section>
                <Image src={Campaigns} height={160} alt="Campaigns" />
              </Card.Section>
              <Text weight={500}>Campaigns</Text>
              <Text size="sm" style={{ lineHeight: 1.5 }}>
                There are currently 0 active campaigns at {company?.name}. Click on the button below to manage campaigns.
              </Text>
              <Button 
                component={Link}
                to='/campaigns'
                fullWidth 
                style={{ 
                  marginTop: 14, 
                  backgroundColor: theme.colors.brand[0] 
                }}
              >
                Manage Campaigns
              </Button>
            </Card>
          </Grid.Col>
          <Grid.Col sm={4}>
            <Card shadow='sm' p='lg'>
              <Card.Section>
                <Image src={Users} height={160} alt="Users" />
              </Card.Section>
              <Text weight={500}>Users</Text>
              <Text size="sm" style={{ lineHeight: 1.5 }}>
                There are currently {users.length} users at {company?.name}. Click on the button below to manage users.
              </Text>
              <Button 
                component={Link}
                to='/users'
                fullWidth 
                style={{ 
                  marginTop: 14, 
                  backgroundColor: theme.colors.brand[0] 
                }}>
                Manage Users
              </Button>
            </Card>
          </Grid.Col>
        </Grid>
        <Alert icon={<AlertCircle size={24} />} title="No Active Campaigns!" color="blue">
            No active campaigns found for {company?.name}. Add more campaigns.
        </Alert>
      </>
    </PrivateRoute>
  )
}

export default Home