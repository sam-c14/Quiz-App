<template>
  <h1 class="bg-red">Heyy</h1>
</template>

<script>
export default {
  mounted(){
    console.log(this.$route.params)
    // console.log(JSON.parse(this.$route.params.id))
  }

}
</script>

<style>

</style>