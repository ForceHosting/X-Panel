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

UserCard.propTypes = {
  server: PropTypes.object.isRequired,
  background: PropTypes.object.isRequired,
};



export default function UserCard({ server, background }) {
  const { panelUser, panelPwd, planType, planDomain, paidPlan } = server;
  const panelPass = atob(panelPwd);

  const { enqueueSnackbar } = useSnackbar();

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
          alt={panelUser}
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
      <Typography variant="subtitle1" sx={{ mt: 6 }}>
        {planType}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        User: {panelUser}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Password: {panelPass}
      </Typography>

      <Divider sx={{ borderStyle: 'dashed', mt: '10px' }} />

      <Box sx={{ py: 3, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Paid Plan
          </Typography>
          <Typography variant="subtitle1">{paidPlan}</Typography>
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Plan Domain
          </Typography>
          <Typography variant="subtitle1">{planDomain}</Typography>
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Delete
          </Typography>
          <Typography variant="subtitle1">Soon</Typography>
        </div>
      </Box>
    </Card>
  );
}
