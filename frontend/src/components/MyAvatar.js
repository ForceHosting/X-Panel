import BoringAvatar from 'boring-avatars';
// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {


  const palette = ['#FFAD08', '#EDD75A', '#73B06F', '#0C8F8F', '#587291'];
  return (
    <BoringAvatar
      colors={palette}
      variant="beam"
      {...other}
    />
  );
}
