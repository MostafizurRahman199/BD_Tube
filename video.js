function getById(id){
    return document.getElementById(id);
}

const category_section = getById("category_section");
const video_section = getById("video_section");
const no_video_section = getById("no_video_section");
const my_modal_1 = getById("my_modal_1");


const loadCategory = async()=>{
   try {

    let data = await fetch(`https://openapi.programming-hero.com/api/phero-tube/categories`);
    data = await data.json();
    data = data.categories;
    // console.log(data);
    return data;


   } catch (error) {
        console.log(error);
   }
}


const btnDesign = async(id)=>{
    
    const data = await loadCategory();
    let allBtn = getById('all');
    
    data.map((item)=>{
        console.log(item.category.toLowerCase(), id);
        if(id === 'all'){
            allBtn.classList = "btn  bg-gradient-to-r from-fuchsia-500 to-cyan-500  rounded-md py-1 px-4  cursor-pointer m-2 text-white";

        }
        else if(item.category.toLowerCase() === id){
            let btn = getById(id);
            btn.classList = "btn  bg-gradient-to-r from-fuchsia-500 to-cyan-500  rounded-md py-1 px-4  cursor-pointer m-2 text-white";
        }
        
        if(item.category.toLowerCase() !== id ){
            let btn = getById(item.category.toLowerCase());
            btn.classList = "btn hover:text-white hover:bg-gradient-to-r hover:from-fuchsia-500 hover:to-cyan-500  rounded-md py-1 px-4  cursor-pointer m-2";

                if(id !== 'all'){
                    allBtn.classList = "btn hover:text-white hover:bg-gradient-to-r hover:from-fuchsia-500 hover:to-cyan-500  rounded-md py-1 px-4  cursor-pointer m-2";
                }
        }
    })
   
}




const loadCategoryWiseVideo = async(id, id2 ) => {
    
    btnDesign(id2);

    try {
       if(id === 'all'){
        loadVideo();
       }else{
            let data = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
        
            data = await data.json();
            console.log(data);
            let videos = data.category;

            if(videos.length){
                console.log(videos)
                displayVideos(videos);

            }else{displayVideos(false);}
        }
    } catch (error) {
        console.log(error);
    }
}


const displayCategory = async()=>{

   const data = await loadCategory();
//    console.log(data);
  data.map((item)=>{
       // category_section.classList = "w-11/12 mx-auto flex justify-center items-center my-2 border-2"
       const id2 = item.category.toLowerCase();
       const category_item = document.createElement("div");
       category_item.innerHTML = ` <div onclick="loadCategoryWiseVideo(${item.category_id}, '${id2}')" type="button" class="btn hover:text-white hover:bg-gradient-to-r hover:from-fuchsia-500 hover:to-cyan-500  rounded-md py-1 px-4  cursor-pointer m-2" id="${id2}">${item.category}</div>`;
       category_section.appendChild(category_item);
 })
}





const loadVideo = async ()=>{
    try {
        let data = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos`);
        data = await data.json();
        let videos = data.videos;
        // console.log(videos)
        displayVideos(videos)
       
    } catch (error) {
        console.log(error);
    }
}

/**
 * {
    "category_id": "1001",
    "video_id": "aaaa",
    "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
    "title": "Shape of You",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
            "profile_name": "Olivia Mitchell",
            "verified": ""
        }
    ],
    "others": {
        "views": "100K",
        "posted_date": "16278"
    },
    "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
}
 * 
 * 
 * 
 */


const loadDetails = async (id)=>{

        try {
            // console.log(id);
            let data = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${id}`);
            data = await data.json();
            showVideoDetails(data.video)
           
            my_modal_1.showModal();

        } catch (error) {
            console.log(error);
        }
}

const showVideoDetails = (video)=>{
  console.log(video);
  console.log(video.title);
  console.log(video.description);

  const div = document.createElement('div');
  my_modal_1.innerHTML = "";
  div.innerHTML = `
  
 <div class="bg-white flex flex-col space-y-4 lg:w-96 h-auto mx-auto p-4">
    <!-- image thumbnail -->
    <div class="relative overflow-hidden">
        <img class="object-cover w-full h-48" src="${video.thumbnail}" alt="Thumbnail">
        ${video?.others?.posted_date.length !== 0 ? `
        <span class="text-sm absolute right-3 bottom-3 text-white bg-black px-2 py-1 rounded-lg">${video?.others?.posted_date || ''}</span>
        ` : ""}
    </div>
    <!-- text_div -->
    <div class="flex flex-col justify-center items-center gap-2 p-2">
        <!-- profile -->
        <h3 class="text-2xl font-bold break-words text-center">${video.title}</h3>
       
        <!-- text -->
        <div class="flex flex-col justify-center items-center space-y-2">
            <div class="w-16 h-16 overflow-hidden">
                <img class="rounded-full object-cover w-full h-full" src="${video.authors[0].profile_picture}" alt="Profile Picture">
            </div>
            <div class="flex items-center gap-2">
                <p class="text-gray-500">${video.authors[0].profile_name}</p>
                ${video.authors[0].verified ? `<img class="w-5" src="./verify.png" alt="Verified">` : ""}
            </div>
            <div class="flex space-x-2">
                <p class="text-gray-500">${video.others.views} Views</p>
            </div>
            <p class="text-gray-600 hover:text-blue-800 text-justify overflow-auto">
                ${video.description}
            </p>
        </div>
    </div>
    <!-- modal action -->
<div class="modal-action ">
    <form method="dialog" class="">
        <button class="border-none btn hover:text-white hover:bg-gradient-to-r hover:from-fuchsia-500 hover:to-cyan-500   rounded-md py-1 px-4  cursor-pointer">Close</button>
    </form>
</div>
</div>



  
  `

  my_modal_1.appendChild(div);
}


const postedTime = (postedDateInSeconds)=>{

const totalSeconds = parseInt(postedDateInSeconds);

// Define time constants
const secondsInAYear = 31536000; // 60 * 60 * 24 * 365
const secondsInADay = 86400;      // 60 * 60 * 24
const secondsInAnHour = 3600;     // 60 * 60
const secondsInAMinute = 60;      // 60

const years = Math.floor(totalSeconds / secondsInAYear);
const days = Math.floor((totalSeconds % secondsInAYear) / secondsInADay);
const hours = Math.floor((totalSeconds % secondsInADay) / secondsInAnHour);
const minutes = Math.floor((totalSeconds % secondsInAnHour) / secondsInAMinute);

// Calculate years, days, hours, and minutes
if (years > 0 ) {
    return `${years} Yr ago`;
} else {
    if (days > 0 && hours == 0) {
        return `${days} D ago`;
    }
    else if(days > 0 && hours > 0){
        return `${days} D ${hours} Hr ago`;
    }
    else {
        if (hours > 0 && minutes == 0) {
            return `${hours} Hr ago`;
        }
        else if(hours > 0 && minutes > 0){
            return `${hours} Hr ${minutes} Min ago`
        }
         else {
            return `${minutes} Min ago`;
        }
    }
}

} 

const displayVideos = (videos)=>{

    if(videos === false){
        video_section.innerHTML = "";
        no_video_section.innerHTML = `<div class="w-full h-full ">
        <div class=" flex flex-col justify-center items-center space-y-4" id="no_video">
                <!-- image -->
                <div class="flex justify-center items-center">
                    <img src="./Icon.png" alt="">
                </div>
                <div class="flex flex-col justify-center items-center">
                    <h1 class="text-2xl font-bold">Opp! Sorry 😰, No video found</h1> <br>
                
                </div>
            </div>
        
        </div>`;
    }else{
        video_section.innerHTML = ""
        no_video_section.innerHTML = "";
        videos.map((item)=> {
            
            // console.log(item)
            let localdate = "";
            if(item?.others?.posted_date.length){
                
                localdate = postedTime(item?.others?.posted_date)
            }
            
              const video_item = document.createElement("div");
              video_section.classList = "w-11/12  grid grid-col-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mx-auto justify-center items-center my-6 space-y-10 space-x-4 ";
                    video_item.innerHTML = `
                    
                  <div class="relative  w-fit bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-lg  hover:shadow-lg">
                        <div class="bg-white flex-col space-y-4  w-64 h-76 mx-auto  hover:scale-95 hover:cursor-pointer transition-all duration-500">
                                            <!-- image thumbail -->
                                            <div class="overflow relative" >
                                                    <img class="object-cover overflow w-64 h-48" src="${item.thumbnail}" alt="">
                                                   ${item?.others?.posted_date.length !== 0 ? ` <span class="text-base absolute right-3 bottom-3 text-white bg-black px-2 py-1 rounded-lg">${localdate}</span>` : ""}
                                            </div>
                                            <!-- text_div -->
                                            <div class="flex justify-start items-start gap-2 p-2">
                                                <!-- profile -->
                                                <div class="w-10 h-10 overflow-hidden">
                                                        <img class="rounded-full object-cover w-full h-full" src="${item.authors[0].profile_picture}" alt="">
                                                </div>
                                                <!-- text -->
                                                <div class="">
                                                    <h3 class="font-bold  break-normal">${item.title}</h3>
            
                                                    <div class="flex  items-center gap-2"> 
                                                        <p class="text-gray-400">${item.authors[0].profile_name}</p>
                                                    <img class="w-5" src="${item.authors[0].verified ? "./verify.png" : "" }" alt=""></img>
                                                    </div>
                                                 <div class="flex space-x-2">
                                                    <p class="text-gray-400">${item.others.views} Views</p>
                                                    <p onclick="loadDetails('${item.video_id}')" class="text-gray-40 hover:text-blue-800 border-b-2 border-transparent hover:border-blue-700" type="button">See Details</p>
                                                 </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                            `;
        
                video_section.appendChild(video_item);
        
    
    
        });
    }

   
}






async function task(){
    await loadCategory();
    await displayCategory();
    await loadVideo();
}


task();