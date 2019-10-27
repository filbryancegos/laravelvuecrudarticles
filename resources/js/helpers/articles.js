export const fetchArticles = () => {
    let thisarticles = [];
    class Articles {
        async getArticles() {
            try {
                let result = await fetch('api/articles');
                let data = await result.json();
                return data
            } catch {
            }
        }

        async getAxious() {
            const url = 'api';
            try {
                const res = await axios.get(`${url}/articles`);
                const result = res;
                return result
                
            } catch(error) {
                console.log(error)
            
            }
        }
    }

    class UI {
        displayArticles(data) {
            const div = document.createElement('div');
            div.classList.add('container');
            let html = '';
            const datas = data.data
            datas.map(content => {
                html += `
                    <div class="card card-body mb-2" data-id="${content.id}">
                        <h3>${content.title}</h3>
                        <p>${content.body}</p>
                        <button class="btn btn-warning mb-2" id="edit">Edit</button>
                        <button class="btn btn-danger" id="delete">Delete</button>
                    </div>
                `
            })
            div.innerHTML = html;
            document.querySelector('section').appendChild(div);
        }

        //  deleteArticles() {
        //     setTimeout(() => {
        //         const delButton = document.querySelectorAll("#delete");
        //         delButton.forEach(btn => {
        //             btn.addEventListener('click',(e) => {
        //                 e.preventDefault();
        //                 const dataId = e.target.parentElement.dataset.id;
        //                 if (confirm('Are You Sure?')) {
        //                 fetch(`api/article/${dataId}`, {
        //                     method: 'delete'
        //                 })
        //                 .then(res => res.json())
        //                 .then(data => {
        //                     // alert('Article Removed');
        //                     console.log(data)
        //                 })
        //                 .catch(err => console.log(err));
        //                 }
        //             })
        //         })
        //     },1000)
            
        // }
    }


    document.addEventListener('DOMContentLoaded', () => {
        const articles = new Articles();
        const ui = new UI();
        articles.getArticles()
        .then(data => {
        
            // ui.displayArticles(data)
        })
        articles.getAxious()
        .then(res => {
            const data = res.data
            thisarticles = data;
            // ui.displayArticles(thisarticles)
        })

        // ui.deleteArticles()

        setTimeout(() => {
            const delButton = document.querySelectorAll("#delete");
            delButton.forEach(btn => {
                btn.addEventListener('click',(e) => {
                    e.preventDefault();
                    const dataId = e.target.parentElement.dataset.id;
                    if (confirm('Are You Sure?')) {
                    fetch(`api/article/${dataId}`, {
                        method: 'delete'
                    })
                    .then(res => res.json())
                    .then(data => {
                        // alert('Article Removed');
                        
                        articles.getAxious()
                        .then(res => {
                            const data = res.data
                            thisarticles = data;
                            ui.displayArticles(thisarticles)
                        })
                    })
                    .catch(err => console.log(err));
                    }
                })
            })
        },1000)
    })   
}

// axios
// .get(page_url)

