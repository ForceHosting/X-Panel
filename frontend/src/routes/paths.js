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
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: '/app',
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
  },
  server: {
    root: path(ROOTS_DASHBOARD, '/server'),
    create: path(ROOTS_DASHBOARD, '/server/create'),
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
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
