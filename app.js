async function fetchMovies(query){
    try{
        showLoader();
        let res=await fetch(`https://www.omdbapi.com/?s=${query}&apikey=3ff185a4`);
        newRes=await res.json();
        console.log(newRes);
        let res1=newRes.Search;
        hideLoader();
        return res1 || [];     
    }
    catch(err){
        console.log(err.message);
        hideLoader();
        return [];
    }  
}

function showLoader(){
    let loadeing=document.querySelector(".loader");
    if(loadeing){
        loadeing.style.display="block";
    }
}
function hideLoader(){
    let loadeing=document.querySelector(".loader");
    if(loadeing){
        loadeing.style.display="none";
    }
}
function displayMovies(movieList,container){
    container.innerHTML="";
    movieList.map(({ Title, Year, Type, Poster }) => {
        let cards = document.createElement("div");
        cards.style.cssText = "height:600px;width:400px;margin-top:30px;border-radius:5px;box-shadow:3px 3px 15px grey;margin-left:20px";
        container.append(cards);
        let part1=document.createElement("div");
        part1.style.cssText="height:100px;width:100%;font-weight:bold;text-align:center;font-size:35px;color:black;paddin-top:10px";
        cards.append(part1);
        part1.innerText=Title;

        
        let part2=document.createElement("div");
        part2.style.cssText="height:350px;width:100%";
        cards.append(part2);
        
        let image=document.createElement("img");
        image.src=(Poster==="N/A")? "https://tse3.mm.bing.net/th?id=OIP.JJVuWGOZsiFAl2pqqsSsNQHaDx&pid=Api&P=0&h=180":Poster;
        image.style.cssText="height:100%;width:100%";
        part2.append(image);

        let part3=document.createElement("div");
        part3.style.cssText="height:70px;width:100%;font-weight:bold;text-align:center;font-size:25px;color:grey;padding-top:10px";
        cards.append(part3);
        part3.innerText=`YEAR OF RELEASE: ${Year}`

        
        let part4=document.createElement("div");
        part4.style.cssText="height:70px;width:100%;font-weight:bold;text-align:center;font-size:25px;color:grey;padding-top:10px";
        cards.append(part4);
        part4.innerText=`TYPE: ${Type}`;
    })
}
async function movies() {
    try {

        let initialMovie=await fetchMovies("animal");
        console.log(initialMovie);
        
        document.documentElement.style.height="100%";
        document.body.style.cssText="height:100%;margin:0px;background-color:black";


        let mainConatiner = document.createElement("div");
        mainConatiner.style.cssText = "height:100%;width:100%;display:flex;justify-content:center;align-items:center;flex-direction:column";
        document.body.prepend(mainConatiner);

        let titleName=document.createElement("h1");
        titleName.innerText="MOVIE STORE";
        titleName.style.cssText="text-align:center;color:red;font-size:45px;padding-top:40px";
        mainConatiner.append(titleName);

        let searchBar=document.createElement("input");
        mainConatiner.append(searchBar);
        searchBar.type="search";
        searchBar.id="searchListen";
        searchBar.placeholder="Search your favourite movie here";   
        searchBar.style.cssText="width:700px;height:50px;padding:20px;font-size:20px;text-align:center;word-spacing:3px;border-radius:10px"

        let innerContainer = document.createElement("div");
        mainConatiner.append(innerContainer);
        innerContainer.style.cssText = "height:90%;width:95%;display:flex;flex-wrap:wrap;gap:35px;box-sizing:border-box;";
   
     
        document.getElementById("searchListen").addEventListener("input",async function(event){
            let query=event.target.value.trim();
            if(query.length>0){
                let currentMovieToBeDisplayed=await fetchMovies(query);
                console.log(currentMovieToBeDisplayed);
                displayMovies(currentMovieToBeDisplayed,innerContainer);

            }

            // else if(query===undefined){
            //     let text=document.createElement("h1");
            //     text.innerText="NOT Found";
            //     text.style.cssText="color:white";
            //     innerContainer.append(text);
            // }
            else{
                displayMovies(initialMovie,innerContainer);
            }            
        })          
    }
    catch (err) {
        console.log(err.message);
    }

}
movies()



