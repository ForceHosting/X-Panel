import { serverIP } from '../config';

export const getUserDataRoute = `${serverIP}/api/auth/getData`;
export const loginRoute = `${serverIP}/api/auth/login`;
export const registerRoute = `${serverIP}/api/auth/register`;
export const addToQueueRoute = `${serverIP}/api/server/create`;
export const createCase = `${serverIP}/api/ticket/create`;
export const logoutRoute = `${serverIP}/api/auth/logout`;
export const getServersRoute = `${serverIP}/api/server/getServers`
export const getTicketMessageRoute = `${serverIP}/api/ticket/getmsg`
export const sendTicketMessageRoute = `${serverIP}/api/ticket/addmsg`
export const getTicketInformationRoute = `${serverIP}/api/ticket/information`
export const generateDiscordLinkIdRoute = `${serverIP}/api/auth/link/generate`
export const deleteServerRoute = `${serverIP}/api/server/delete`
export const renewServerRoute = `${serverIP}/api/server/renew`