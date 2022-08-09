import { serverIP } from '../config';

export const getUserDataRoute = `${serverIP}/api/auth/getData`;
export const loginRoute = `${serverIP}/api/auth/login`;
export const registerRoute = `${serverIP}/api/auth/register`;
export const addToQueueRoute = `${serverIP}/api/server/create`;
export const createCase = `${serverIP}/api/ticket/create`;
export const logoutRoute = `${serverIP}/api/auth/logout`;
export const getServersRoute = `${serverIP}/api/server/getServers`