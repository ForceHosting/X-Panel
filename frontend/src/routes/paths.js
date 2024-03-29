// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  banned: '/banned',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: '/app',
  controlPanel: 'https://control.forcehost.net',
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    earn: path(ROOTS_DASHBOARD, '/coins/earn'),
    store: path(ROOTS_DASHBOARD, '/coins/store'),
    jfr: path(ROOTS_DASHBOARD, '/join-for-resources'),
  },
  server: {
    root: path(ROOTS_DASHBOARD, '/server'),
    create: path(ROOTS_DASHBOARD, '/server/create'),
    global: path(ROOTS_DASHBOARD, '/servers/global'),
  },
  coins: {
    root: path(ROOTS_DASHBOARD, '/coins'),
    store: path(ROOTS_DASHBOARD, '/coins/store'),
    earn: path('/coins/earn')
  },
  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    view: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
  },
  web: {
    root: path(ROOTS_DASHBOARD, '/web'),
    create: path(ROOTS_DASHBOARD, '/web/create'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  user: {
    account: path(ROOTS_DASHBOARD, '/user/account'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    view: (title) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
  },
  staff: {
    root: path(ROOTS_DASHBOARD, '/staff'),
    users: path(ROOTS_DASHBOARD, '/staff/users'),
    udetails: (id) => path(ROOTS_DASHBOARD, `/staff/user/${id}`),

  }
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
