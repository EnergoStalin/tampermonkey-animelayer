import iziToast from 'izitoast';

/**
 * @param {import('../GMStore').GMStore} gmstore
 * @param {import('../Animelayer').Animelayer} animelayer
 */
export function initSettings(gmstore, animelayer) {
  window.addEventListener('keydown', async (e) => {
    if (!(e.ctrlKey && e.key === 'm')) return;

    const endpoint = prompt('New endpoint.');
    const secret = prompt('New secret.');

    if (!endpoint || !secret) {
      console.warn(endpoint, secret);
      return;
    }

    gmstore.endpoint = endpoint;
    gmstore.secret = secret;

    try {
      await animelayer.connect();
      iziToast.success({
        title: 'Status',
        message: 'Connected!',
      });
    } catch (ex) {
      console.error(ex);
      iziToast.error({
        title: 'Status',
        message: 'Error(',
      });
    }
  });
}
