import { FC, useEffect } from 'react'
import { Button, Group, Title, useMantineTheme } from '@mantine/core'
import PrivateRoute from '../../components/PrivateRoute'
import { Plus } from 'tabler-icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../types/AppDispatch'
import { RootState } from '../../types/RootState'
import { Company } from '../../types/Company'
import { RequestState } from '../../types/RequestState'

const Campaigns: FC = () => {
  const theme = useMantineTheme()

  const dispatch = useDispatch<AppDispatch>()
  const company = useSelector<RootState, Company | null>((state) => state.user.company)
  const currentUserState = useSelector<RootState, RequestState>((state) => state.user.getMe)
  
  useEffect(() => {
    if (currentUserState.success) {
      console.log('fetch all campaigns')
    }
  }, [currentUserState.success])

  return (
    <PrivateRoute>
      <>
        <Group position='apart'>
          <Title
            order={1}
            sx={{
              fontFamily: theme.fontFamily,
              color: theme.colors.brand[1]
            }}
          >
            Campaigns
          </Title>
          <Button
            style={{
              marginTop: 14,
              backgroundColor: theme.colors.brand[0]
            }}
          >
            Add Campaign
            <Plus size={16} />
          </Button>
        </Group>
      </>
    </PrivateRoute>
  )
}

export default Campaigns