import {Animelayer} from './Animelayer.js';
import {GMStore} from './GMStore.js';
import {initButton} from './UI/Button.js';
import {initSettings} from './UI/Settings.js';
import iziToast from 'izitoast';

import 'https://raw.githubusercontent.com/marcelodolza/iziToast/master/dist/css/iziToast.min.css';

const store = new GMStore();
const animelayer = new Animelayer(store);

initSettings(store, animelayer);

if (store.endpoint && store.secret) {
  (async function() {
    try {
      await animelayer.connect(store.endpoint, store.secret);
      console.log('Connected to', store.endpoint);
      iziToast.success({
        title: 'Connected to',
        message: store.endpoint,
        timeout: 3000,
      });
    } catch (err) {
      console.error(err);
      iziToast.error({
        title: 'Connection failed',
        message: store.endpoint,
        timeout: 3000,
      });
      return;
    }

    initButton(animelayer);
  })();
}
