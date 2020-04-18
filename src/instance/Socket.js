import io from 'socket.io-client';
import conf from 'config.json';

export const socket = io(conf.apiEndPoint);
