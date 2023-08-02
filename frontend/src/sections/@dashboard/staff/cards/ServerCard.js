import PropTypes from 'prop-types';
// @mui
import { useSnackbar } from 'notistack';
import { styled } from '@mui/material/styles';
import { Box, Card, Avatar, Divider, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router';

// utils
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

ServerCard.propTypes = {
  server: PropTypes.object.isRequired,
};



export default function ServerCard({ server }) {
  

  const {serverName, serverId, serverNode, serverMemory, serverCPU, serverDisk, serverStatus, serverOwner} = server;

  const { enqueueSnackbar } = useSnackbar();
  const nav = useNavigate();
  const viewUserProfile = async (event,srv) => {
      nav(`/staff/server/${srv._id}`)
    }
  

  return (
    <Card sx={{ textAlign: 'center' }}  onClick={(event) => viewUserProfile(event,server)}>
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
          src={"https://media.discordapp.net/attachments/739975144625143894/1101212444157812828/Force_Hosting-full_logo_Colour_inverson_transparent.png?width=595&height=842"}
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
        
        <Image src={`https://media.discordapp.net/attachments/739975144625143894/1101212443860029560/Force_Host_Youtube_banner.png?width=675&height=379`} alt={"cover"} ratio="16/9" />
        
      </Box>
      <Typography variant="subtitle1" sx={{ mt: 6 }}>
        {serverName}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        uid: {serverId}
      </Typography>

      <Divider sx={{ borderStyle: 'dashed', mt: '10px' }} />

      <Box sx={{ py: 3, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
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
      </Box>
    </Card>
  );
}
