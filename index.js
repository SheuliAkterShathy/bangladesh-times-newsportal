
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
    <h5>${newses.length} items found for this category.</h5>
    `
  }
  else{
    foundItems.innerHTML=`
    <h5>No items found for this category'</h5>
    `
  }
 
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = '';
  newses.sort((a, b) => b.total_view - a.total_view);
  newses.forEach(news => {
  

  console.log(news)
  const {image_url, title, details,author,total_view,_id } = news;

  const newsDiv = document.createElement('div');
           newsDiv.classList.add('col');
           newsDiv.innerHTML =`
           <div class="card h-100">
                <img src="${image_url}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text">${details.length > 180 ? details.slice(0,180) + '...' : details}</p>
                </div>
                <div class="d-flex p-2" id="author">
                      <img src="${author.img ? author.img: `no found image`}" style="width:50px" class="rounded-circle me-2">

                      <div>
                      <p>Author name: ${author.name? author.name: `no found information`}</p>
                      <p> Published: ${author.published_date ? author.published_date : 'No found date' }</p>
                      </div>
                       <div class="d-flex justify-content-evently">
                      <p>Total view: ${total_view ? total_view: 'Not found data' }</p>
                     
                     <button class="btn btn-primary ms-5 h-75"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadNewsDetail('${_id}')">Details</button>
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
  <img src ="${image_url}" style="width:100%;">
  <p>Author name:${author.name ? author.name : 'No name found'} </p>
  <p>Published date: ${author.published_date ? author.published_date :'no date found'}</p>
  <p>total view:${total_view ? total_view : 'No data found'}</p>
  <p class="card-text">${details.length > 110 ? details.slice(0,110) + '...' : details}</p>
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







  