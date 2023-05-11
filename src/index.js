import { Animelayer } from './Animelayer.js';
import { GMStore } from './GMStore.js';
import { initButton } from './UI/Button.js';
import { initSettings } from './UI/Settings.js';

const store = new GMStore();
const animelayer = new Animelayer(store);

initButton(animelayer);
initSettings(store, animelayer);

if(store.endpoint && store.secret) {
  console.log(store.endpoint, store.secret);
  animelayer.connect(store.endpoint, store.secret);
}
