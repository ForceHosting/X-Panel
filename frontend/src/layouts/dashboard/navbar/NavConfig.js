// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  server: getIcon('ic_server'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_menu_item'),
  globe: getIcon('ic_globe'),
  money: getIcon('ic_money'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      { title: 'create server', path: PATH_DASHBOARD.server.create, icon: ICONS.server },
      { title: 'Global Servers', path: PATH_DASHBOARD.server.global, icon: ICONS.globe},
      { title: 'Join For Resources', path: PATH_DASHBOARD.general.jfr, icon: ICONS.banking},
      {
        title: 'Coins',
        path: PATH_DASHBOARD.coins.root,
        icon: ICONS.money,
        children: [
          { title: 'Store', path: PATH_DASHBOARD.general.store },
          { title: 'Earn', path: PATH_DASHBOARD.general.earn },
        ],
      },
    ],
    
  },
  {
    subheader: 'Information',
    items: [
      { title: 'Developer Blog', path: PATH_DASHBOARD.blog.root, icon: ICONS.dashboard},
      { title: 'Control Panel', path: PATH_DASHBOARD.controlPanel, icon: ICONS.menuItem}
    ]
  }

 
];

export default navConfig;
