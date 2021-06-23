<script>
  export let member

  console.log(member, member.children)
</script>

<h1>{member.name}</h1>

{#if member.children}
  {#each member.children as child}
    <svelte:self member={child} />
  {/each}
{/if}
<hr />
