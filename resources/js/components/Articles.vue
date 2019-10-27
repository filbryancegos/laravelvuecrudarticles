<template>
<section>
    <div class="container">
    <div v-if="showmessage" class= "alert" :class="errorclass" role="alert">
        Article {{alertmessage}}!
    </div>
    <h2 class="mt-2">Articles</h2>

    <form @submit.prevent="addArticle" class="mb-3">
        <div class="form-group">
        <input type="text" class="form-control" placeholder="Title" v-model="article.title">
        </div>
        <div class="form-group">
        <textarea class="form-control" placeholder="Body" v-model="article.body"></textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Save</button>
    </form>

    <button @click="clearForm()" class="btn btn-danger btn-block">Cancel</button>

    <nav aria-label="Page navigation example" class="mt-5">
        <ul class="pagination">
            <li :class="[{disabled: !pagination.prev_page_url}]" class="page-item"><a class="page-link" href="#" @click="fetchArticles(pagination.prev_page_url)">Previous</a></li>
            <li class="page-item disabled"><a class="page-link text-dark" href="#">Page {{ pagination.current_page }} of {{ pagination.last_page }}</a></li>
            <li :class="[{disabled: !pagination.next_page_url}]" class="page-item"><a class="page-link" href="#" @click="fetchArticles(pagination.next_page_url)">Next</a></li>
        </ul>
    </nav>

    <div class="card card-body mb-2" v-for="article in articles" 
    :key="article.id">
        <h3>{{article.title}}</h3>
        <p>{{article.body}}</p>
        <button @click="editArticle(article)" class="btn btn-warning mb-2">Edit</button>
        <button @click="deleteArticle(article.id)" class="btn btn-danger">Delete</button>
    </div>

  </div>
</section>
  
</template>

<script>
    export default {
        data() {
            return {
                articlesaxious: [],
                articles: [],
                article: {
                    id: '',
                    title: '',
                    body: ''
                },
                ariticle_id: '',
                pagination: {},
                edit: false,
                showmessage: false,
                errorclass: '',
                alertmessage: ''
            }
        },
        created() {
            this.fetchArticles();
            this.axiousArticles();
        },
        methods: {
            axiousArticles(page_url) {
                let vm = this;
                page_url = page_url || 'api/articles';
                axios
                .get(page_url)
                .then(response => {
                    this.articlesaxious = response.data;
                })
            },
            fetchArticles(page_url) {
                let vm = this;
                page_url = page_url || 'api/articles';
                fetch(page_url)
                .then(response => response.json())
                .then(res => {
                    this.articles = res.data;
                    vm.makePagination(res.meta,res.links);
                })
                .catch(err => console.log(err))
            },
            makePagination(meta, links) {
                let pagination = {
                    current_page: meta.current_page,
                    last_page: meta.last_page,
                    next_page_url: links.next,
                    prev_page_url: links.prev
                };
                this.pagination = pagination;
            },
            deleteArticle(id) {
            if (confirm('Are You Sure?')) {
                fetch(`api/article/${id}`, {
                    method: 'delete'
                })
                .then(res => res.json())
                .then(data => {
                    // alert('Article Removed');
                    this.scrollToTop();
                    this.showAlert('warning','successfully removed');
                    // this.fetchArticles();
                })
                .catch(err => console.log(err));
                }
            },
            addArticle() {
                if (this.edit === false) {

                    console.log(this.article);
                    // Add
                    fetch('api/article', {
                    method: 'post',
                    body: JSON.stringify(this.article),
                    headers: {
                        'content-type': 'application/json'
                    }
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.clearForm();
                        this.scrollToTop()
                        this.showAlert('success','succesfully added');
                        this.fetchArticles();
                    })
                    .catch(err => console.log(err));
                    } else {
                        // Update
                        console.log(this.article);
                        fetch('api/article', {
                        method: 'put',
                        body: JSON.stringify(this.article),
                        headers: {
                            'content-type': 'application/json'
                        }
                        })
                        .then(res => res.json())
                        .then(data => {
                            this.clearForm();
                            this.showAlert('success', 'succesfully updated');
                            this.fetchArticles();
                        })
                        .catch(err => console.log(err));
                    }
                },
                 editArticle(article) {
                    this.edit = true;
                    this.article.id = article.id;
                    this.article.article_id = article.id;
                    this.article.title = article.title;
                    this.article.body = article.body;
                    this.scrollToTop();
                },
                clearForm() {
                    this.edit = false;
                    this.article.id = null;
                    this.article.article_id = null;
                    this.article.title = '';
                    this.article.body = '';
                },
                showAlert(success,message) {
                    this.showmessage = true;
                    this.errorclass = `alert-${success}`;
                    this.alertmessage = message;
                    setTimeout(() => {
                        this.showmessage = false
                        this.errorclass = '';
                    },2000)
                },
                scrollToTop() {
                    window.scrollTo(0,0);
                }
        }
    }
</script>