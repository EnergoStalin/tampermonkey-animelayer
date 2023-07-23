<script lang="ts">
	import { fade } from 'svelte/transition';
  import { animelayer, gmstore } from './store';
  import ControlPane from './components/ControlPane.svelte';
  import { SvelteToast } from '@zerodevx/svelte-toast';
    import Settings from './components/Settings.svelte';

  const a21 = document.body.querySelector('a.button-large:nth-child(1)') as HTMLLinkElement;
  const parent = a21.parentElement;
  parent.removeChild(a21);

  const pane = new ControlPane({
    target: parent,
    props: {
      href: a21.href
    },
  })

  parent.style.display = 'flex';
  parent.style.flexDirection = 'column-reverse';
</script>

<SvelteToast />
<Settings />