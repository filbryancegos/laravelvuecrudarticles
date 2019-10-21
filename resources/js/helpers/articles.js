export const fetchArticles = () => {
    class Articles {
        async getArticles() {
            try {
                let result = await fetch('api/articles');
                let data = await result.json();
                return data
            } catch {
            }
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const articles = new Articles();
        articles.getArticles()
        .then(articles => {
            console.log(articles)
        })
        .then(() => {
            
        })
      
    })

    // axious
    const BASE_URL = 'api';

    const getTodos = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/articles`);
            const todos = res.data;
            console.log(`GET: Here's the list of todos`, todos);
            return todos;
        } catch (e) {
            console.error(e);
        }
    };

    getTodos();
}


// axios
// .get(page_url)

