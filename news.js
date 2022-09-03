// data loaded start---

const newsDataLoadded = async ()=>{
const url = ` https://openapi.programming-hero.com/api/news/categories`;
const res = await fetch(url);
const newsDAta = await res.json();



 return newsDAta.data.news_category; 


}

// ---------------
//  catagory name set 
const catagoryNameSet = async ()=> {

const allCatagoryData = await newsDataLoadded();


// const datas = await allNewCatagory(id)


const AllCatagoryMenu= document.getElementById('catagory-menu');
// console.log(allCatagoryData)
allCatagoryData.forEach(newsTitle => { 
    const {category_id,category_name} =newsTitle;
    allNewCatagory(category_id)
    
    const li = document.createElement('li');
    li.innerHTML = ` <li class="px-3 hover" onclick="detail('${category_id}')">${category_name}</li>`;
    AllCatagoryMenu.appendChild(li)
});
}
catagoryNameSet();
// --catagory id find  ----

const allNewCatagory =async (catagory_id)=>{

    
    
   const res = await  fetch ( `https://openapi.programming-hero.com/api/news/category/${catagory_id}`)
   const data = await res.json()
   return data ; 

}
    











const detail = async(id)=>{
    

   
// const retunAllDAta =await allNewCatagory(id);
const allDAta =await allNewCatagory(id)
const allDatanews = allDAta.data;


const madalBodyNews = document.getElementById('modal-news');



    const createDiv = document.getElementById('news-information');
    createDiv.textContent = ''

    //     console.log(newsInfo)
    // }
   
    allDatanews.forEach(data => {
        console.log(id,data)
       

 const {_id,author,image_url,title,rating,thumbnail_url,details}= data; 
       // console.log(d)
    madalBodyNews.innerHTML= `<h5>${title} </h5> <img src="${image_url}" class="img-fluid rounded" alt="..."> <h1>${author.name ? author.name : "Not Names Found"}</h1>`
        const div = document.createElement('div');
         div.classList.add('col');
        div.innerHTML = `     
        <img src="${image_url}" class="img-fluid rounded" alt="...">
      </div>
      <div class="col-md-8">
      <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">${details.length>100 ? details.slice(0,100)+'...':details}</p>
      <p class="card-text"><small class="text-muted px-2"> <div>
      <img  src="${author.img}" class="img-fluid rounded-start w-25 rounded-circle style="max-width: 40px;" alt="..."> <span class="px-3 fs-2">${author.name?author.name:"Not data found"} </span><small class="text-muted fs-2 px-4">Views: ${rating.number ? rating.number : "Not views"}M</small>
      <p class="text-center my-2"> <button type="button" onclick="ModalsNewsShows('${image_url}','${details}')" class="btn btn-primary rounded-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
      News Details
    </button></p>
      </div>
   </p>
   
   
    `;
    createDiv.appendChild(div)
     
    })
}


// Modals show infomation -----------

const ModalsNewsShows =async (image_url, details)=>{
    console.log( image_url,details)

    const newsdata = await allNewCatagory(details);
    const InformationNews = newsdata.data;
    console.log(newsdata);



    // InformationNews.forEach(newsData => {
    //     const {_id,author,image_url,title,rating,thumbnail_url,details}= newsData;
    //     const div = document.createElement('div')
    //     div.innerHTML = `<div>   <img src="${image_url}" class="img-fluid rounded" alt="..."> <h5 class="card-title">${title}</h5> <h1>${author.name?author.name:"Not data found"} </h1></div>`
    //     madalBodyNews.appendChild(div)



    // })
    




}


// -----------------------

