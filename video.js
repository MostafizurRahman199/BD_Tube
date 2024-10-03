function getById(id){
    return document.getElementById(id);
}

const category_section = getById("category_section");
const video_section = getById("video_section");


const loadCategory = async()=>{
   try {

    let data = await fetch(`https://openapi.programming-hero.com/api/phero-tube/categories`);
    data = await data.json();
    data = data.categories;
    data.map((item)=> displayCategory(item.category));

   } catch (error) {
        console.log(error);
   }
}


const displayCategory= (item)=>{
    // category_section.classList = "w-11/12 mx-auto flex justify-center items-center my-2 border-2"
    const category_item = document.createElement("div");
    category_item.innerHTML = ` <div class="btn t  hover:text-white hover:bg-gradient-to-r hover:from-fuchsia-500 hover:to-cyan-500  rounded-md py-1 px-4  cursor-pointer m-2" id="${item}">${item}</div>`;
    category_section.appendChild(category_item);
}



const loadVideo = async ()=>{
    try {
        let data = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos`);
        data = await data.json();
        let videos = data.videos;
        console.log(videos)
        videos.map((item)=> displayVideos(item));
    } catch (error) {
        console.log(error);
    }
}


const postedTime = (postedDateInSeconds)=>{
 // Given value in seconds


// Convert to an integer
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
        if (hours >0 && minutes == 0) {
            return `${hours} Hr ago`;
        }
        else if(hours >0 && minutes > 0){
            return `${hours} Hr ${minutes} Min ago`
        }
         else {
            return `${minutes} Min ago`;
        }
    }
}

} 

const displayVideos = (item)=>{
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
                                        <p class="text-gray-400">${item.others.views} Views</p>
                                    </div>
                                </div>
                            </div>
                            </div>
                    `;

        video_section.appendChild(video_item);

}


async function task(){
    await loadCategory();
    await loadVideo();
}


task();