import BoringAvatar from 'boring-avatars';
// ----------------------------------------------------------------------
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

export default function MyAvatar({ user, ...other }) {

  const palette = ['#FFAD08', '#EDD75A', '#73B06F', '#0C8F8F', '#587291'];
  return (
    <Avatar
      src={user?.profilePicture}
      alt={user?.username}
      color={user?.profilePicture ? 'default' : createAvatar(user?.username).color}
      {...other}
    >
      {createAvatar(user?.displayName).name}
    </Avatar>
  );
}
