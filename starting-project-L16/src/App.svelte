<script>
  import Product from './Product.svelte'
  import CartItem from './CartItem.svelte'
  import FamilyNode from './FamilyNode.svelte'

  let y
  let title = 'My app'

  $: console.log(y)

  let familyStructure = [
    {
      isParent: true,
      name: 'Anna',
      children: [
        {
          isParent: true,
          name: 'Emma',
          children: [{ isParent: false, name: 'Fiona' }],
        },
      ],
    },
    { isParent: true, name: 'Danny' },
    { isParent: true, name: 'Danny' },
    { isParent: true, name: 'Danny' },
    { isParent: true, name: 'Danny' },
    { isParent: true, name: 'Danny' },
    { isParent: true, name: 'Danny' },
    { isParent: true, name: 'Danny' },
  ]

  let renderedComponent = { cmp: Product, title: 'Test Product', id: 'p1' }

  function toggle() {
    if (renderedComponent.cmp === Product) {
      renderedComponent = { cmp: CartItem, title: 'Test CartItem', id: 'p2' }
    } else {
      renderedComponent = { cmp: Product, title: 'Test Product', id: 'p1' }
    }
  }

  function switchTitle() {
    title = 'A new title'
  }
</script>

<svelte:window bind:scrollY={y} />
<svelte:body on:mouseenter />
<svelte:head>
  <title>{title}</title>
</svelte:head>

<button on:click={switchTitle}>Switch</button>
<div class="high">
  <button on:click={toggle}>Toggle Display</button>

  <svelte:component
    this={renderedComponent.cmp}
    title={renderedComponent.title}
    id={renderedComponent.id}
  />

  {#each familyStructure as familyMember}
    <FamilyNode member={familyMember} />
  {/each}
</div>

<style>
  div {
    height: 5000px;
  }
</style>
