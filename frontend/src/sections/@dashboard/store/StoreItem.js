import PropTypes from 'prop-types';
// @mui
import { useSnackbar } from 'notistack';
import { styled } from '@mui/material/styles';
import { Box, Card, Avatar, Divider, Typography, Button, Badge } from '@mui/material';
// utils
import { purchaseResources } from '../../../utils/APIRoutes';
import axios from '../../../utils/axios';
import Iconify from '../../../components/Iconify';
import cssStyles from '../../../utils/cssStyles';
// components
import Image from '../../../components/Image';
import SvgIconStyle from '../../../components/SvgIconStyle';

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

StoreCard.propTypes = {
  item: PropTypes.object.isRequired,
  background: PropTypes.object.isRequired,
};



export default function StoreCard({ item, background }) {
  const { name, img, price, amount, itemId, desc } = item;

  const { enqueueSnackbar } = useSnackbar();
  const purchaseItem = async (event,item) => {
    const getPurchaseData = await axios.post(`${purchaseResources}`,{itemId: item.itemId},
    {headers:
      {'Authorization': `${localStorage.getItem('token')}`
    }}
    );
    if(getPurchaseData.data.status !== 200){
      enqueueSnackbar(getPurchaseData.data.msg, {variant: 'error'});
    }else{
      enqueueSnackbar('Purchase successful!', {variant: 'success'});
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
        
        <Iconify icon={img} width="32" height="32" sx={{
            width: 50,
            height: 50,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -28,
            mx: 'auto',
            position: 'absolute',
          }}/>
        <OverlayStyle />
        
        <Image src={background} alt={"cover"} ratio="16/9" />
        
      </Box>
      <Typography variant="subtitle1" sx={{ mt: 4 }}>
        {name}
      </Typography>
      <Button variant="outlined" sx={{ ml: 1,mt:1}} color="success" onClick={(event) => purchaseItem(event, item)} >Purchase!</Button>
      <Divider sx={{ borderStyle: 'dashed', mt: '10px' }} />

      <Box sx={{ py: 4, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Price
          </Typography>
          <Typography variant="subtitle1">¢{price}</Typography>
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Amount
          </Typography>
          <Typography variant="subtitle1">{amount}</Typography>
        </div>
      </Box>
    </Card>
  );
}
