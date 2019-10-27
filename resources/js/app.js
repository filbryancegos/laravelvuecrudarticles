/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
require('./main');

window.Vue = require('vue');

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import App from './App.vue';
import Articles from './components/Articles.vue';
import Skills from './components/Skills.vue';

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

// Vue.component('articles', require('./components/Articles.vue').default);
// Vue.component('navbar', require('./components/NavBar.vue').default);


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const routes = [
    {
        name: 'home',
        path: '/vuelaravelcrud/public/',
        component: Articles
    },
    {
        name: 'skills',
        path: '/vuelaravelcrud/public/skills',
        component: Skills
    },
  ];

// const app = new Vue({
//     el: '#app',
// });
const router = new VueRouter({
     mode: 'history', 
     routes: routes
});
const app = new Vue(Vue.util.extend(
    { router }, 
    App
)).$mount('#app');
