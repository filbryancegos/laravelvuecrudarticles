<template>
<div class="container">
    <nav class="navbar navbar-expand-sm navbar-dark">
        <ul class="navbar-nav">
            <li class="nav-item">
                <router-link to="/vuelaravelcrud/public/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/vuelaravelcrud/public/" class="nav-link">Create Post</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/vuelaravelcrud/public/" class="nav-link">Posts</router-link>
            </li>
        </ul>
    </nav>
</div>
    
</template>
<script>
    export default {
        mounted() {
            console.log('Example Articles mounted.')
        }
    }
</script>