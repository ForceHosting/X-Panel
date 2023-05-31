import PropTypes from 'prop-types';
// @mui
import { useSnackbar } from 'notistack';
import { styled } from '@mui/material/styles';
import { Box, Card, Avatar, Divider, Typography, Button } from '@mui/material';
// utils
import { deleteServerRoute } from '../../../../utils/APIRoutes';
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

GlobalCard.propTypes = {
  server: PropTypes.object.isRequired,
  background: PropTypes.object.isRequired,
};



export default function GlobalCard({ server, background }) {
  const { serverName, serverMemory, serverCPU, serverDisk, serverId } = server;

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

  return (
    <Card sx={{ textAlign: 'center', height: 250 }}>
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
          src={"https://cdn.discordapp.com/attachments/739975144625143894/1101212389963210903/Force_Hosting-full_logo_dark_mode_no_bg.png"}
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
        
        <Image src={background} alt={"cover"}  sx={{height: 100}} />
        
      </Box>
      <Typography variant="subtitle1" sx={{ mt: 4 }}>
        {serverName}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Id: {serverId}
      </Typography>

      <Divider sx={{ borderStyle: 'dashed', mt: '10px' }} />

      <Box sx={{ py: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            IP
          </Typography>
          <Typography variant="subtitle1">{serverMemory}</Typography>
        </div>

        <div/>
          


        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Owner
          </Typography>
          <Typography variant="subtitle1">{serverDisk}</Typography>
        </div>
      </Box>
    </Card>
  );
}
