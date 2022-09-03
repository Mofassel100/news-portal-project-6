// ----news information start now---

const newsDataLoadded = async ()=>{
const url = ` https://openapi.programming-hero.com/api/news/categories`;
const res = await fetch(url);
const newsDAta = await res.json();
 return newsDAta.data.news_category; 
}
// -----------Dynamicaly news title add name set-------

const LoadSpiner =document.getElementById('loading-spiner');


const catagoryNameSet = async ()=> {
const allCatagoryData = await newsDataLoadded();
const AllCatagoryMenu= document.getElementById('catagory-menu');



allCatagoryData.forEach(newsTitle => {
  
const {category_id,category_name} =newsTitle;
    allNewCatagory(category_id)
const li = document.createElement('li');
    li.innerHTML = ` <li class="px-3 text-primary  "  onclick="detail('${category_id}')">${category_name}</li>`;
AllCatagoryMenu.appendChild(li)
});
}
catagoryNameSet();

// ---------------------name set end------------
// --All news in a Category url & responsive ----
const allNewCatagory =async (catagory_id)=>{ 
   const res = await  fetch ( `https://openapi.programming-hero.com/api/news/category/${catagory_id}`)
   const data = await res.json()
   return data ; 

}
// ----All news in a Category All information----

const detail = async(id)=>{
const allDAta =await allNewCatagory(id)
const allDatanews = allDAta.data;
const createDiv = document.getElementById('news-information');
createDiv.textContent = ''
LoadSpiner.classList.remove('visually-hidden') 
allDatanews.forEach(data => {
  LoadSpiner.classList.add('visually-hidden')
 const {_id,author,image_url,title,rating,details,total_view}= data; 
//  ----news paramiter -------
 newsDetailUrl(_id);  
    const div = document.createElement('div');
   
    div.classList.add('col');
    div.innerHTML = `<div class=" my-3"row> <div  class="col-sm-12   ">
    <div> <img src="${image_url}" class="img-fluid  rounded"  alt="..."> </div>    
       
      </div>
      <div class="col-sm-12 ">
      <div class="card-body">
      <h5 class="card-title text-primary my-2">${title}</h5>
      <p class="card-text">${details.length> 350 ? details.slice(0,350)+'...':details}</p>
      <p class="card-text"><small class="text-muted px-2">
      <img  src="${author.img}" class="img-fluid rounded-start w-25 rounded-circle  alt="..."> <span class="px-3 fs-2 text-primary">${author.name?author.name:"Not data found"} </span> </small> <span class""> View:${total_view ? total_view : "Not views"}<small class="text-muted fs-5 px-2">Rating:${rating.number ? rating.number : "Not views"}M</small> </p>
      <p class="text-center my-5"> <button type="button" onclick="newsDetailsInfo('${_id}')" class="btn btn-primary rounded-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
      News Details
    </button></p>
    
    </div>
    </div>
    <div>
    `;
    createDiv.appendChild(div)
     
    })
}
// ---------------------------- All news end  -------------------------------------

// ------------ news Details respon && data return information start now ---------------------
const  newsDetailUrl = async (news_id)=>{

const url = `https://openapi.programming-hero.com/api/news/${news_id}`
const res = await fetch(url)
const newsDetailsData = await res.json();
console.log(news_id, newsDetailsData.data);

return newsDetailsData;


} 

// news show detail information & Modals opens----

const newsDetailsInfo= async(news)=>{
const newsDataRetunr = await newsDetailUrl(news);
const newsDetailData= newsDataRetunr.data;
const madalBodyNews = document.getElementById("modal-news");
newsDetailData.forEach(newsDe =>{
    const {author,details,image_url,rating,thumbnail_url,title,total_view}=newsDe;
  madalBodyNews.innerHTML =`<div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div  class="modal-body">
      <img  src="${image_url}" class="img-fluid rounded-start  rounded  alt="...">
      <p class="card-text mt-3">${details.length>250 ? details.slice(0,250)+'...':details}</p>
      </div>
      <div class="modal-footer">
      <p class="card-text"><small class=" text text-primary fs-5 px-2">${author.name?author.name:"Not data found"} </small>
       <small class="text-black  px-2">Rating :${rating.number ? rating.number : "Not views"}M</small> <span text-black>Views :${total_view ? total_view :"NO views"}</span> </p>

        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
      </div>`;
})

}



// -----------------------news details end ----------

