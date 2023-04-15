import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD, PATH_AUTH } from '../../../routes/paths';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import Iconify from '../../../components/Iconify';


// _mock_
import { _contacts } from '../../../_mock';
// components
import useAuth from '../../../hooks/useAuth';

import { IconButtonAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;

// ----------------------------------------------------------------------

export default function ContactsPopover() {
  const navigate = useNavigate();
  const isMountedRef = useIsMountedRef();

  const { user, logout } = useAuth();

    const logoutUser = async () => {
        await logout();
        navigate(PATH_AUTH.login, { replace: true });
    };
  return (
    <>
      <IconButtonAnimate
        color={'default'}
        onClick={logoutUser}
        sx={{
          width: 40,
          height: 40,
        }}
      >
        <Iconify icon={'solar:logout-3-bold-duotone'} width={25} height={25} />
      </IconButtonAnimate>
    </>
  );
}
