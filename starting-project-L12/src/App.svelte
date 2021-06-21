<script>
  import { writable } from "svelte/store" 
  import { tweened } from "svelte/motion"
  import { cubicIn } from "svelte/easing"
  import { fade, fly, scale, slide} from "svelte/transition"
  import { flip } from "svelte/animate"

  import Spring from "./Spring.svelte"
import { loop_guard } from "svelte/internal"
  
  let boxInput
  let showParagraph = false

  const progress  = tweened(0, {
    delay:0,
    duration: 700,
    easing: cubicIn
  })

  setTimeout(()  => {
    progress.set(0.5)
  }, 1500)

  let boxes = []

  function addBox() {
    boxes = [boxInput.value, ...boxes]
  }

  function discard(value) {
    boxes = boxes.filter(el => el !== value)
  }
</script>

<style>
  div {
    width: 10rem;
    height: 10rem;
    background: #ccc;
    margin: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 1rem;
    border-radius: 5px;
  }
</style>
<!-- <progress value={$progress}></progress> -->

<!-- <Spring /> -->

<button on:click="{() => showParagraph = !showParagraph}">Toggle</button>

{#if showParagraph}
  <p in:fade out:fly={{x: 300}}>Can you see me?</p>
{/if}

<hr>

<input type="text" bind:this={boxInput}>
<button on:click={addBox}>Add</button>


{#if showParagraph}
  {#each boxes as box (box)}
    <div 
      transition:fly|local={{easing: cubicIn, x: 0, y: 300}} 
      on:click={discard.bind(this,box)} 
      on:introstart={() => console.log('Adding the element start')}
      on:introend={() => console.log('Adding the element starts')}
      on:outrostart={() => console.log('Removing the element start')}
      on:outroend={() => console.log('Removing the element starts')}
      animate:flip={{duration: 300}}
    >
      {box}
    </div>
  {/each}
{/if}




