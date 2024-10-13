
const loadCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/phero-tube/categories"
  );
  const data = await res.json();
  dispalyCategory(data.categories);
};
const dispalyCategory =(categories) =>{
  const categoryContainer = document.getElementById('categoris')
    categories.forEach(element => {
        const buttonContainer = document.createElement('div')
        buttonContainer.innerHTML = `
         <div>
            <button onclick="loadHandalerCategory('${element.category_id}')" class='btn border-red-500'>${element.category}</button>
        </div>
        `;
        categoryContainer.append(buttonContainer);
    });
}

// card-container

const loadCardContainer = async() =>{
   const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
   const data = await res.json()
   displayCardContainer(data.videos);
}

const displayCardContainer = (videos) =>{
    const cardContainer = document.getElementById('card-container');
    const noData = document.getElementById('noData');
    noData.classList.add('hidden');
    cardContainer.classList.remove('hidden');
    cardContainer.innerHTML = '';

      if(videos.length === 0){
        noData.classList.remove('hidden');
        cardContainer.classList.add('hidden');
      }

     videos.forEach((video) =>{

     const card = document.createElement('div');
     card.classList = 'card card-compact  object-cover mt-5 '
     card.innerHTML = `
       <figure  class='h-[200px]  object-cover'>
              <img class='w-full h-full object-cover'
                src="${video.thumbnail}"
                alt="${video.title}" />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${video.title}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-end">
                <button onclick="loadHandelDetailsData('${video.video_id}')" class="btn btn-error">Details</button>
              </div>
            </div>
     `;
     cardContainer.append(card);
     })
}


const loadHandalerCategory = async(category_id) => {
const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${category_id}`)
const data = await res.json()
displayCardContainer(data.category);
}

const loadHandalSearchVideo = async()=>{
  const searchVideo = document.getElementById('search-input').value;

  const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchVideo}`)
  const data = await res.json()
  displayCardContainer(data.videos);

}

const loadHandelDetailsData = async(video_id) =>{
  const modalContainer = document.getElementById('modal-container');
  my_modal_5.showModal();
 const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`)
 const data = await res.json()
 console.log(data.video);

 const {thumbnail, title,description} = data.video

 const div = document.createElement('div');
 div.innerHTML = `
 <div class="card card-compact bg-base-100  shadow-xl">
          <figure>
            <img
              src="${thumbnail}"
              alt="Shoes"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">${title}</h2>
            <p>${description}</p>
            <div class="card-actions justify-end">
              <div class="modal-action">
                <form method="dialog">
                  <button class="btn">Close</button>
                </form>
              </div>
              </div>
          </div>
        </div>
 `;
 modalContainer.appendChild(div);
}






loadCategory();
loadCardContainer();