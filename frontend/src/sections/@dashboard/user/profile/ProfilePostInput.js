import { useRef, useState, useEffect } from 'react';
// @mui
import { Box, Card, Button, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import jwtDecode from 'jwt-decode';

import axios from '../../../../utils/axios';
import { createNewPost } from '../../../../utils/APIRoutes';

// ----------------------------------------------------------------------

export default function ProfilePostInput() {
  const fileInputRef = useRef(null);

  const handleAttach = () => {
    fileInputRef.current?.click();
  };
  const [count, setCount] = useState(0);
  const [postContents, setPostContents] = useState(null);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token')
      const decoded = jwtDecode(token);
      setUserId(decoded._id)
  }, [])

  function updateNewPost(e){
    setCount(e.target.value.length);
    setPostContents(e.target.value);
  }

  const onSubmit = async (e) => {
    setPostContents('');
    setCount(0)
    const {data} = await axios.post(createNewPost,{postContents, userId},{
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      }
    });
  };


  return (
    <Card sx={{ p: 3 }}>
      <TextField
        multiline
        fullWidth
        rows={4}
        inputProps={{maxLength: 336}}
        placeholder="Share what you are thinking here..."
        value={postContents}
        onChange={e => updateNewPost(e)}
        sx={{
          '& fieldset': {
            borderWidth: `1px !important`,
            borderColor: (theme) => `${theme.palette.grey[500_32]} !important`,
          },
        }}
      />
      <Box
        sx={{
          mt: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex' }}>
        <Typography sx={{ opacity: 0.72 }}>{count}/336</Typography>
          </Box>
        <LoadingButton variant="contained" onClick={() => onSubmit()}>Post</LoadingButton>
      </Box>

    </Card>
  );
}
