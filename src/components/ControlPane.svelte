<script lang="ts">
  import { blobToBase64 } from '../blobToB64.js';
  import { animelayer } from '../store.js';
  import { toast } from '@zerodevx/svelte-toast'

  export let href: string;

  let link: HTMLAnchorElement;
  let login = animelayer.isConnected();

  const selector = 'a.button-large:nth-child(1)';
  const downloadButton = document.body.querySelector(selector);
  downloadButton

  async function onDownload(e: MouseEvent) {
    if(!e.shiftKey || !login) return
    e.preventDefault();

    const torrent = await (await fetch(href)).blob();
    const b64torrent = await blobToBase64(torrent);
    
    const items = await animelayer.downloadLastEpisode(b64torrent);
    toast.push({
      msg: items.map(e => e.path).join('<br/>')
    })
  }
</script>

<a class="button button-large button-block button-green" class:disabled={!login} bind:this={link} href="{href}" on:click={onDownload}>Скачать бебру</a>

<style>
  .disabled {
    background-color: gray;
    border-color: darkgray;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  }
</style>