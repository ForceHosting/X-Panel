import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Box,
  Link,
  Card,
  Stack,
  Paper,
  Avatar,
  Checkbox,
  TextField,
  Typography,
  CardHeader,
  IconButton,
  AvatarGroup,
  InputAdornment,
  FormControlLabel,
  Tooltip
} from '@mui/material';
// hooks
import useAuth from '../../../../hooks/useAuth';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fShortenNumber } from '../../../../utils/formatNumber';
// components
import Image from '../../../../components/Image';
import Markdown from '../../../../components/Markdown';

import Iconify from '../../../../components/Iconify';
import MyAvatar from '../../../../components/MyAvatar';
import { EmojiPicker } from '../../../../components/emoji-picker';

// ----------------------------------------------------------------------

ProfilePostCard.propTypes = {
  post: PropTypes.object,
};

function staffBadge(){
  return (
    <Tooltip title="Force Team" placement="top" describeChild>
    <IconButton sx={{}}>
    <Iconify icon={'mdi:badge'} sx={{color: '#708090 ' }} width={20} height={20} />
    </IconButton>
    </Tooltip>
  )
}

function rocketBadge(){
  return (
    <Tooltip title="Rocket User" placement="top" describeChild>
    <IconButton sx={{ ml:-1,}}>
    <Iconify icon={'ion:rocket-sharp'} sx={{color: '#DC143C ' }} width={20} height={20} />
    </IconButton>
    </Tooltip>
  )
}


export default function ProfilePostCard({ post, profile }) {
  const { user } = useAuth();
  const epoch = post.postedOn;
  const myDate = new Date(epoch*1000);
  const month = myDate.getMonth();
  const nameMonth = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  const datePosted = `${myDate.getDate()} ${nameMonth[month]}, ${myDate.getFullYear()}. ${myDate.getHours()}:${myDate.getMinutes()}`


  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={<MyAvatar user={profile} />}
        title={
          <Link to="#" variant="subtitle2" color="text.primary" component={RouterLink}>
            {profile.username} {profile.company === 'Force Host' ? staffBadge() : '' }{profile.isRocket ? rocketBadge() : '' }
          </Link>
        }
        subheader={
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            {datePosted}
          </Typography>
        }
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Markdown>{post.postContent}</Markdown>


      </Stack>
    </Card>
  );
}
