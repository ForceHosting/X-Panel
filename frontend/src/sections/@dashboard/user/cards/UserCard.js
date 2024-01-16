import PropTypes from 'prop-types';
// @mui
import { useSnackbar } from 'notistack';
import { styled } from '@mui/material/styles';
import { Box, Card, Avatar, Divider, Typography, Button, Badge } from '@mui/material';
// utils
import { deleteServerRoute, renewServerRoute } from '../../../../utils/APIRoutes';
import axios from '../../../../utils/axios';
import cssStyles from '../../../../utils/cssStyles';
// components
import Image from '../../../../components/Image';
import SvgIconStyle from '../../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute',
}));

// ----------------------------------------------------------------------

UserCard.propTypes = {
  server: PropTypes.object.isRequired,
  background: PropTypes.object.isRequired,
};



export default function UserCard({ server, background }) {
  const { serverName, serverMemory, serverCPU, serverDisk, serverId, serverRenewal, serverStatus } = server;

  const { enqueueSnackbar } = useSnackbar();

  const deleteServer = async (event,server) => {
    console.log(server.id)
    const getDeleteData = await axios.post(`${deleteServerRoute}`,{server: server._id},
    {headers:
      {'Authorization': `${localStorage.getItem('token')}`
    }}
    );
    if(getDeleteData.data.status !== 200){
      enqueueSnackbar(getDeleteData.data.msg, {variant: 'error'});
    }else{
      enqueueSnackbar('Server deleted successfully')
    }

  }
  const renewServer = async (event,server) => {
    console.log(server.id)
    const getRenewData = await axios.post(`${renewServerRoute}`,{server: server._id},
    {headers:
      {'Authorization': `${localStorage.getItem('token')}`
    }}
    );
    if(getRenewData.data.status !== 200){
      enqueueSnackbar(getRenewData.data.msg, {variant: 'error'});
    }else{
      enqueueSnackbar('Server renewed successfully')
    }

  }

  return (
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <SvgIconStyle
          src="https://minimal-assets-api-dev.vercel.app/assets/icons/shape-avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: -26,
            mx: 'auto',
            position: 'absolute',
            color: 'background.paper',
          }}
        />
        
        <Avatar
          alt={serverName}
          src={"https://img.icons8.com/clouds/344/minecraft-logo.png"}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: 'auto',
            position: 'absolute',
          }}
        />
        <OverlayStyle />
        
        <Image src={background} alt={"cover"} ratio="16/9" />
        
      </Box>
      {serverStatus === "Active" ? 
        <Badge badgeContent={'Active'} color="success" sx={{mt:6}}/>
        :
<Badge badgeContent={'Suspended'} color="warning" sx={{mt:6}}/>
      }
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        {serverName}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Id: {serverId}
      </Typography>
      
      <Button variant="outlined" sx={{ mt: 1}} color="error" onClick={(event) => deleteServer(event, server)}>
  Delete Server
</Button>
<Button variant="outlined" sx={{ ml: 1,mt:1}} color="warning" onClick={(event) => renewServer(event, server)}>
  Renew Server
</Button>

      <Divider sx={{ borderStyle: 'dashed', mt: '10px' }} />

      <Box sx={{ py: 4, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Memory
          </Typography>
          <Typography variant="subtitle1">{serverMemory}</Typography>
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            CPU
          </Typography>
          <Typography variant="subtitle1">{serverCPU}</Typography>
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Disk
          </Typography>
          <Typography variant="subtitle1">{serverDisk}</Typography>
        </div>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Next Renewal
          </Typography>
          <Typography variant="subtitle1">{new Date(serverRenewal).toLocaleDateString()}</Typography>
        </div>
      </Box>
    </Card>
  );
}
