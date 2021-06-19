<script>
  import CustomInput from './CustomInput.svelte'
  import Toggle from './Toggle.svelte'


  let val = "Max"
  let selectedOption = 1
  let price = 0
  let agreed
  let color = 'red'
  let singleColor = 'red'
  let usernameInput
  let customInput

  $: console.log(val)
  $: console.log(selectedOption)
  $: console.log(typeof price)
  $: console.log(agreed)
  $: console.log(color)
  $: console.log(singleColor)
  $: console.log(customInput)

  function setValue(event) {
    val = event.target.value
  }

  function saveData () {
    console.log(usernameInput.value)
  }
</script>

<!-- <input type="text" bind:value="{val}"> -->
<CustomInput bind:val={val}  bind:this={customInput}/>

<Toggle bind:chosenOption={selectedOption}/>

<input type="number" bind:value="{price}">

<label>
  <input type="checkbox" bind:checked="{agreed}">
  Agree?
</label>

<h1>Color</h1>
<label>
  Red
  <input type="checkbox" name="color" value="red" bind:group="{color}">
</label>
<label>
  Blue
  <input type="checkbox" name="color" value="blue" bind:group="{color}">
</label>
<label>
  Green
  <input type="checkbox" name="color" value="green" bind:group="{color}">
</label>

<select bind:value="{singleColor}">
  <option value="green">Green</option>
  <option value="red">Red</option>
  <option value="blue">Blue</option>
</select>

<input type="text" bind:this="{usernameInput}">
<button on:click="{saveData}">Save</button>