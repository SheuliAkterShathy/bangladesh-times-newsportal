// const loadNews = () =>{
//     const url=`https://openapi.programming-hero.com/api/news/categories`
//       fetch(url)
//     .then(res=>res.json())
//     .then(data=>setAllNews(data))
// }

// const setAllNews =(newss) =>{
//     newss.forEach(item => {
//     console.log(item)
    
// });
// }
// loadNews();

const loadAllNews = async() =>{
   try{
    const url= `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data.news_category)
    return(data.data.news_category)
   }
   catch{

   }
 }
 const setAllMenu=async() =>{
    const data = await loadAllNews();
     const menu = document.getElementById("all-menu");
    data.forEach(news => {
        // console.log(news)
        const li = document.createElement("li");
        li.innerHTML = `<a>${news. category_name}</a>`;
        menu.appendChild(li);
    });
    
 }
setAllMenu()

const loadNews = () =>{
    const url=`https://openapi.programming-hero.com/api/news/category/01`
      fetch(url)
    .then(res=>res.json())
    .then(data=>displayNews(data.data))
}
const displayNews = (news) =>{
    const newsContainer = document.getElementById('news-container');
    news.forEach(single => {
        console.log(single)
        const {image_url, title, details,author,total_view } = single;
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('row');
        newsDiv.classList.add('border');
        newsDiv.innerHTML = `
        <div class="col-md-4 g-2">
                    <img src="${image_url}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body p-2">
                      <h5 class="card-title">${title}</h5>
                      <p class="card-text">${details.length > 220 ? details.slice(0,220) + '...' : details}</p>
                      <div class="d-flex">
                      <img src="${author.img ? author.img: `no found image`}" style="width:60px" class="rounded-circle me-3">
                      <div>
                      <p>${author.name? author.name: `no found information`}</p>
                      <p>${author.published_date}</p>
                      </div>
                      <p class="mx-auto">Total view: ${total_view}</p>
                      </div>
                      
                    </div>
                  </div>
    `
    newsContainer.appendChild(newsDiv);
    });
}
loadNews()