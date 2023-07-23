import { GMStore } from './GMStore';
import { Animelayer } from './api/animelayer';

export const gmstore = new GMStore();
export const animelayer = new Animelayer(gmstore);