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

const loadAllCategories = async() =>{
  try {
    const url= `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    setAllMenu(data.data.news_category)
    
  } catch (error) {
    alert(error)
  }
   
    
  }
 const setAllMenu=async(catagories) =>{
   
     const menu = document.getElementById("all-menu");
    catagories.forEach(catagory => {
         console.log(catagory)
        const li = document.createElement("li");
        li.innerHTML = `<a onclick="loadAllNews('${catagory.category_id}')">${catagory. category_name}</a>`;
        menu.appendChild(li);
    });
    
 }
loadAllCategories()

// news setup
const loadAllNews = async(category_id) =>{
  toggleSpinner(true)
  try{
    const url= `https://openapi.programming-hero.com/api/news/category/${category_id}`
  const res = await fetch(url);
  const data = await res.json();
  displayAllNews(data.data)
 
  }

  catch (error){
    alert(error)
  }
 
}

const displayAllNews = (newses) =>{
  const foundItems = document.getElementById('found-items');
  if(newses.length>0){
    foundItems.innerHTML=`
    <h4>${newses.length} items found for this category'</h4>
    `
  }
  else{
    foundItems.innerHTML=`
    <h4>No items found for this category'</h4>
    `
  }
 
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = '';
  newses.sort((a, b) => b.total_view - a.total_view);
  newses.forEach(news => {
  // console.log(`${news.total_view}`)

  console.log(news)
  const {image_url, title, details,author,total_view,_id } = news;

  const newsDiv = document.createElement('div');
           newsDiv.classList.add('col');
           newsDiv.innerHTML =`
           <div class="card">
                <img src="${image_url}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h6 class="card-title">${title}</</h6>
                  <p class="card-text">${details.length > 180 ? details.slice(0,180) + '...' : details}</p>
                </div>
                <div class="d-flex">
                      <img src="${author.img ? author.img: `no found image`}" style="width:60px" class="rounded-circle me-3">
                      <div>
                      <p>${author.name? author.name: `no found information`}</p>
                      <p>${author.published_date}</p>
                      </div>
                      <p class="mx-auto">Total view: ${total_view}</p>
                      <button class="btn btn-primary h-25"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadNewsDetail('${_id}') ">Show Details</button>
                     </div>
              </div>
           `
newsContainer.appendChild(newsDiv)
});
toggleSpinner(false)


}


const loadNewsDetail = async(news_id) =>{
  try {
    const url= `https://openapi.programming-hero.com/api/news/${news_id}`
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetail(data.data[0])
  
  } catch (error) {
    alert(error)
  }
 
}
 const displayNewsDetail = (newsDetail) =>{
 console.log(newsDetail)
 const {image_url, title, details,author,total_view,_id } = newsDetail;

 const modalTitle = document.getElementById('exampleModalLabel');
          modalTitle.innerText=title;
  const modalDetails = document.getElementById('modalBodyDetails');
  modalDetails.innerHTML=`
  <img " src ="${image_url}" style="width:100%"  >
  <p>Author name:${author.name ? author.name : 'no name found'} </p>
  <p>Published date: ${author.published_date ? author.published_date :'no date found'}</p>
  <p>total view:${total_view ? total_view : 'not found'}</p>
  `          
}

const toggleSpinner = isLoading =>{
  const loaderSection = document.getElementById('loader');
  if(isLoading){
    loaderSection.classList.remove('d-none')
  }
  else{
      loaderSection.classList.add('d-none')
  }
}


loadAllNews('08');



// const loadNews = async() =>{
//     const url=`https://openapi.programming-hero.com/api/news/category/${id}`
//     const res = await fetch(url)
//     const data = await res.json();
//     displayNews(data.data)
// }
// const displayNews = (newses) =>{
//     const newsContainer = document.getElementById('news-container');
//     // console.log(news)
//     news.forEach(single => {
//         const {image_url, title, details,author,total_view,_id } = single;
//         const newsDiv = document.createElement('div');
//         newsDiv.classList.add('row');
//         newsDiv.classList.add('border');
//         newsDiv.innerHTML = `
//         <div class="col-md-4 g-2">
//                     <img src="${image_url}" class="img-fluid rounded-start" alt="...">
//                   </div>
//                   <div class="col-md-8">
//                     <div class="card-body p-2">
//                       <h5 class="card-title">${title}</h5>
//                       <p class="card-text">${details.length > 220 ? details.slice(0,220) + '...' : details}</p>
//                       <div class="d-flex">
//                       <img src="${author.img ? author.img: `no found image`}" style="width:60px" class="rounded-circle me-3">
//                       <div>
//                       <p>${author.name? author.name: `no found information`}</p>
//                       <p>${author.published_date}</p>
//                       </div>
//                       <p class="mx-auto">Total view: ${total_view}</p>
//                       <button class="btn btn-primary h-25"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="displayNewsDetail('${_id}')">Show Details</button>
//                       </div>
                      
//                     </div>
//                   </div>
//     `
//     newsContainer.appendChild(newsDiv);
//     });
// }
// loadNews()
// const loadNewsDetail = async () =>{
//   const url = `https://openapi.programming-hero.com/api/news/${01}`;
//   const res = await fetch(url);
//   const data = await res.json();
//   displayNewsDetail(data.data);

// }

//     const displayNewsDetail = (data) =>{
//           // console.log(data)
//         const modalTitle = document.getElementById('exampleModalLabel');
//         modalTitle.innerText=data.title;

    
//     }
    
//     loadNewsDetail()

  