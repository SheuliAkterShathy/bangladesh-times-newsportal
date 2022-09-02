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
    console.log(data.data.news_category)
    return(data.data.news_category)
   }
   catch{

   }
 }
 const setAllMenu=async() =>{
    const data = await loadAllNews();
     const menu = document.getElementById("all-menu");
    data.forEach(news => {
        console.log(news)
        const li = document.createElement("li");
        li.innerHTML = `<a>${news. category_name}</a>`;
        menu.appendChild(li);
    });
    
 }
setAllMenu()