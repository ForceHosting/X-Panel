// @mui
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import { Typography, Card, CardContent } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: 'grey.500',
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

// ----------------------------------------------------------------------

AppWelcome.propTypes = {
  action: PropTypes.node,
  description: PropTypes.string,
  img: PropTypes.node,
  title: PropTypes.string,
  color: PropTypes.string,
};

export default function AppWelcome({ title, description, action, img, color="primary", ...other }) {
  const theme = useTheme();

  return (
    <RootStyle sx={{backgroundColor:[theme.palette[color].darker]}} {...other}>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
          color: 'grey.200',
        }}
      >
        <Typography gutterBottom variant="h4" sx={{ whiteSpace: 'pre-line' }}>
          {title}
        </Typography>

        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
          {description}
        </Typography>

        {action && action}
      </CardContent>

      {img && img}
    </RootStyle>
  );
}
