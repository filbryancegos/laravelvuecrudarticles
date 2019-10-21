<template>
  <div class="">
    <header class="bg-dark">
        <navbar></navbar>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import navbar from './components/NavBar.vue';
    export default{
    name: 'nav',
    components: {
        navbar,
    },
}
</script>

<style>
</style>

