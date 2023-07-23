<script type="ts">
	import { Animelayer } from './../api/animelayer.js';
  import { blobToBase64 } from '../blobToB64.js';
  import { animelayer } from '../store.js';

  const selector = 'a.button-large:nth-child(1)';
  const downloadButton = document.body.querySelector(selector);

  async function onDownload(e) {
    // const torrent = await (await fetch(downloadButton.getAttribute('href'))).blob();
    // const b64torrent = await blobToBase64(torrent);
    
    // const items = await animelayer.downloadLastEpisode(b64torrent);
  }
</script>

<button on:click={onDownload}>Button</button>
