/**
 * @param {import('../GMStore').GMStore} gmstore
 * @param {import('../Animelayer').Animelayer} animelayer
 */
export function initSettings(gmstore, animelayer) {
  window.addEventListener('keydown', async (e) => {
    if (!(e.ctrlKey && e.key === 'm')) return;

    gmstore.endpoint = prompt('New endpoint.');
    gmstore.secret = prompt('New secret.');

    if (!gmstore.endpoint || !gmstore.secret) {
      return;
    }

    try {
      await animelayer.connect();
      alert('Connected...');
    } catch (ex) {
      console.error(ex);
      alert('Failed...');
    }
  });
}
