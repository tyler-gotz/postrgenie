import React from 'react'
import { Header, MediaQuery, Title, useMantineTheme } from '@mantine/core'
import { Wand } from 'tabler-icons-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RequestState } from '../../types/RequestState'
import { RootState } from '../../types/RootState'

const AppHeader: React.FC = () => {
  const theme = useMantineTheme()

  const currentUserState = useSelector<RootState, RequestState>((state) => state.user.getMe)

  let menuItems

  if (currentUserState.loading) {
    menuItems = null
  }


  if (currentUserState.success) {
    menuItems = (
      <>
        <Link to="/clients" style={{ marginRight: 15 }}>
          Clients
        </Link>
        <Link to="/campaigns" style={{ marginRight: 15 }}>
          Campaigns
        </Link>
        <Link to="/users" style={{ marginRight: 15 }}>
          Users
        </Link>
        <Link to="/users" style={{ marginRight: 15 }}>
          Logout
        </Link>
      </>
    )
  } else {
    menuItems = (
      <>
        <Link to="/login" style={{ marginRight: 15 }}>
          Login
        </Link>
        <Link to="/register">
          New Company
        </Link>
      </>
    )
  }

  return (
    <Header
      height={65}
      p='md'
      sx={{
        backgroundColor: theme.colors.brand[1],
        color: theme.colors.brand[0]
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}
      >
        <Link
          to='/'
          style={{
            display: 'flex',
            color: '#F61067'
          }}
        >
          <Title order={2} sx={{ fontFamily: theme.fontFamily }}>
            PostrGenie
          </Title>
          <Title order={2} sx={{ fontFamily: theme.fontFamily, marginLeft: 5, marginTop: 5 }}>
            <Wand />
          </Title>
        </Link>
        <MediaQuery
          smallerThan="sm"
          styles={{ display: 'none', justifyContent: 'end' }}
        >
          <div>
            {menuItems}
          </div>
        </MediaQuery>
      </div>
    </Header>
  )
}

export default AppHeader