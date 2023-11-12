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

QueueCard.propTypes = {
  server: PropTypes.object.isRequired,
  background: PropTypes.object.isRequired,
};



export default function QueueCard({ server, background }) {
  const { serverName, serverMemory, serverCPU, serverDisk, position, serverNode, serverStatus } = server;

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
        <Badge badgeContent={'QUEUED'} color="primary" sx={{mt:6}}/>
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        {serverName}
      </Typography>
      <Typography variant="caption" sx={{ mt: 2 }}>
        Node: {serverNode}
      </Typography>

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
            Position
          </Typography>
          <Typography variant="subtitle1">{position}</Typography>
        </div>
      </Box>
    </Card>
  );
}
