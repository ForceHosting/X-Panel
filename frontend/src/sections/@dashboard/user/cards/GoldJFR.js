import PropTypes from 'prop-types';
// @mui
import { useSnackbar } from 'notistack';
import { styled } from '@mui/material/styles';
import {Link} from 'react-router-dom'
import { Box, Card, Avatar, Divider, Typography, Button, Badge } from '@mui/material';
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

GoldJFR.propTypes = {
  server: PropTypes.object.isRequired,
  background: PropTypes.object.isRequired,
};



export default function GoldJFR({ server, background }) {

  const { guildId, guildName, guildBanner, guildIcon, claimAmount, guildInvite } = server;
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
    <Badge color="success" badgeContent={'GOLD'}/>
    <Card sx={{ textAlign: 'center', height: 275, background: 'radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)' }}>

      <Box sx={{ position: 'relative', background: 'radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)' }}>
      
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
            color: 'transparent',
          }}
        />
        
        <Avatar
          alt={guildId}
          src={guildIcon}
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
        
        <Image src={guildBanner} alt={"cover"}  sx={{height: 100}} />
      </Box>
      
      <Typography variant="subtitle1" sx={{ mt: 4 }}>
        {guildName}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        <Button variant="contained" color="primary"><a href={`https://${guildInvite}`} target='noreferrer'>Join Server</a></Button>
      </Typography>

      <Divider sx={{ borderStyle: 'dashed', mt: '10px' }} />

      <Box sx={{ py: 1, display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)' }}>
        <div>
          <Typography variant="subtitle2" component="div" sx={{ mb: 0.75, color: 'text.white' }}>
            Claim Amount
          </Typography>
          <Typography variant="subtitle2">{claimAmount}</Typography>
        </div>


        
      </Box>
    </Card>
    </>
  );
}
