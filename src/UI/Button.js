import {blobToBase64} from '../utils.js';
import iziToast from 'izitoast';

/**
 * @param {import('../Animelayer').Animelayer} animelayer
 */
export function initButton(animelayer) {
  const selector = 'a.button-large:nth-child(1)';
  const downloadButton = document.body.querySelector(selector);

  downloadButton.addEventListener('click', async (e) => {
    if (!e.shiftKey) return;
    e.preventDefault();

    const torrent = await (await fetch(e.target.href)).blob();
    const b64torrent = await blobToBase64(torrent);

    const items = await animelayer.downloadLastEpisode(b64torrent);

    iziToast.info({
      title: 'Downloading',
      message: items.join('</br>'),
    });
  });
}
