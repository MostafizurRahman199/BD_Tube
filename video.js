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
    category_item.innerHTML = ` <div class="btn hover:bg-red-700 hover:text-white rounded-md py-1 px-4 text-red-700 cursor-pointer m-2" id="${item}">${item}</div>`;
    category_section.appendChild(category_item);
}



const loadVideo = async ()=>{
    try {
        let data = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos`);
        data = await data.json();
        let videos = data.videos;
        // console.log(videos)
        videos.map((item)=> displayVideos(item));
    } catch (error) {
        console.log(error);
    }
}


const displayVideos = (item)=>{

 const video_item = document.createElement("div");
 video_section.classList = "w-11/12  grid grid-cols-4 mx-auto justify-center items-center my-6 space-y-4 space-x-4 border-2";
    video_item.innerHTML = ` <div class="flex-col space-y-4  rounded-lg w-64 h-auto mx-auto transition-all duration-500 hover:scale-110 hover:cursor-pointer">
                        <!-- image thumbail -->
                        <div class="overflow  " >
                                <img class="object-contain overflow w-64 max-h-48" src="${item.thumbnail}" alt="">
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
                                    <img class="w-5" src="./verify.png" alt="">
                                </div>
                                <p class="text-gray-400">${item.others.views} Views</p>
                            </div>
                        </div>
                    </div>`;

                    video_section.appendChild(video_item);

}


async function task(){
    await loadCategory();
    await loadVideo();
}


task();