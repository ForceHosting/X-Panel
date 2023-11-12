import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Button } from '@mui/material';
//
import Iconify from '../../Iconify';

// ----------------------------------------------------------------------

export default function SettingSnowy() {
  const [snowy, setSnowy] = useState(true);

  const toggleFullScreen = () => {
    if (snowy === true) {
        setSnowy(false);
    } else if (snowy===false) {
      setSnowy(true);
    }
  };

  return (
    <Button
      fullWidth
      size="large"
      variant="outlined"
      color={fullscreen ? 'primary' : 'inherit'}
      startIcon={<Iconify icon={fullscreen ? 'ic:round-fullscreen-exit' : 'ic:round-fullscreen'} />}
      onClick={toggleFullScreen}
      sx={{
        fontSize: 14,
        ...(fullscreen && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        }),
      }}
    >
      {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
    </Button>
  );
}
