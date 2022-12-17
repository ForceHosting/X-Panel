// @mui
import {useEffect, useState} from 'react';
import { Stack, Button, Typography } from '@mui/material';
// hooks
import jwtDecode from 'jwt-decode';
import useLocales from '../../../hooks/useLocales';
// assets
import { DocIllustration } from '../../../assets';

// ----------------------------------------------------------------------

export default function NavbarDocs() {
  const [user, setUserInfo] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token')
      const decoded = jwtDecode(token);
      setUserInfo(decoded)
  }, [])

  const { translate } = useLocales();

  return (
    <Stack spacing={3} sx={{ px: 5, pb: 5, mt: 10, width: 1, textAlign: 'center', display: 'block' }}>
      <DocIllustration sx={{ width: 1 }} />

      <div>
        <Typography gutterBottom variant="subtitle1">
          {translate('docs.hi')}, {user?.username}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', whiteSpace: 'pre-line' }}>
          {translate('docs.description')}
        </Typography>
      </div>

      <Button href={"https://discord.gg/xFtqjTtBNy"} target="_blank" rel="noopener" variant="contained">
        {translate('docs.documentation')}
      </Button>
    </Stack>
  );
}
