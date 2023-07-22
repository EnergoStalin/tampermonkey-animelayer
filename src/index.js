import {Animelayer} from './Animelayer.js';
import {GMStore} from './GMStore.js';
import {initButton} from './UI/Button.js';
import {initSettings} from './UI/Settings.js';

const store = new GMStore();
const animelayer = new Animelayer(store);

initSettings(store, animelayer);

if (store.endpoint && store.secret) {
  (async function() {
    try {
      await animelayer.connect(store.endpoint, store.secret);
      console.log('Connected to', store.endpoint);
    } catch (err) {
      console.error(err);
      alert('Connection failed', store.endpoint);
      return;
    }

    initButton(animelayer);
  })();
}
