<script lang="ts">
  import { animelayer, gmstore } from './store';
</script>

<div class="overlay flex-container">
  <div class="modal flex-container">
    <p>This is text</p>
  </div>
</div>

<style>
  .flex-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .overlay {
    background-color: rgba(0, 0, 0, 0.7);
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }
  .modal {
    width: 30%;
    background-color: rgb(94, 111, 128);
    border-radius: 1em;
  }
</style>