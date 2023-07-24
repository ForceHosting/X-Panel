import { useEffect, useState } from 'react';
// @mui
import { Card, Container } from '@mui/material';
// redux
import { useDispatch } from '../../redux/store';
import axios from '../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { ChatSidebar, ChatWindow } from '../../sections/@dashboard/chat';
import { getAllTickets } from '../../utils/APIRoutes';

// ----------------------------------------------------------------------

export default function Chat() {
  const { themeStretch } = useSettings();
  const [currentTickets, setCurrentTickets] = useState([]);
  const [ranOnce, setRanOnce] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if(ranOnce === false){ 
      (async function getData() {
        const data = await axios.get(`${getAllTickets}`,{
          headers: {
            'Authorization': `${localStorage.getItem('token')}`
          }
        });
              setCurrentTickets(data.data);
              console.log(data.data);
                  setRanOnce(true)
                })();
              }

        })

  return (
    <Page title="Chat">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Chat"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Chat' }]}
        />
        <Card sx={{ height: '72vh', display: 'flex' }}>
          <ChatSidebar />
          <ChatWindow />
        </Card>
      </Container>
    </Page>
  );
}
