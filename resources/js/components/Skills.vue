<template>
<div class="container">
    <ul>
        <li v-for="skill in skills" :key="skill">{{skill}}</li>
    </ul>
</div>
    
</template>
<script>
    export default {
       data() {
            return {
                skills: []
            }
        },
        mounted() {
            // make an ajax request to our server
            axios.get('api/skills')
            .then(response => {
                this.skills = response.data;
            })
        }
    }
</script>