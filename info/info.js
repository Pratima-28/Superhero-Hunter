const fetchCharacterApi = "https://gateway.marvel.com/v1/public/characters";
const ts = 1;
const publicKey = "d6d00f7e656233af849ed35ec0924aed";
// const private1 = "aa31c31d17e205848965ed210a5a7fceda75263b";
const hash = "781fb025e03b0ebeaac787569d892bfd";

const container = document.getElementById("container");
const left  = document.getElementById("left");
const right  = document.getElementById("right");
const SUPERHERO_KEY = 'superhero';

document.addEventListener('DOMContentLoaded',function(){
    var resp=getParams(window.location.href);
    superheroWithId(resp.id);
});

function getParams(url) {
	var queryParameter=url.split("?")[1];
    queryParameter=queryParameter.split("&");
    var resp={};
    for(var i = 0; i < queryParameter.length; i++) {
        var temp=queryParameter[i].split("=");
        resp[temp[0]]=temp[1];
    }
    return resp;
};

function getItemFromLS(){
	var favSuperHeroArray = JSON.parse(localStorage.getItem(SUPERHERO_KEY));
	if(!favSuperHeroArray){
		favSuperHeroArray = [];
	}
	return favSuperHeroArray;
}


function addItemToLS(item){
    console.log(item);
	var favSuperHeroArray = getItemFromLS();
	//validation if item is present or not
	var isPresent = false;
	favSuperHeroArray.map((tempItem)=>{
		if(item == tempItem ){
			isPresent = true;
		}
	});
	if(isPresent){
		return;
	}
	favSuperHeroArray = [item,...favSuperHeroArray];
	localStorage.setItem(SUPERHERO_KEY,JSON.stringify(favSuperHeroArray));
}


async function superheroWithId(id){
    var resp = await fetch(fetchCharacterApi+"/"+id+'?ts='+ts+'&apikey='+publicKey+'&hash='+hash);
    var data = await resp.json();
    var results = data.data.results;
    addToList(results);
}

async function superheroWithIdItem(id){
    var resp = await fetch(fetchCharacterApi+"/"+id+'?ts='+ts+'&apikey='+publicKey+'&hash='+hash);
    var data = await resp.json();
    var results = data.data.results;
    return results;
}

function addToList(results){
    if(!results || results.length<1){
        return;
    }
    const item=results[0];
    console.log(item);
    left.innerHTML=`<div >
                            <img src=${item.thumbnail.path}.${item.thumbnail.extension}></div>`;
    
    right.innerHTML+=`<p><h1>${item.name}</h1></p>
                                <h2>No. of Comics : ${item.comics.available}</h2>
                               <h2>No. of Series : ${item.series.available}</h2>
                               <h2>No. of Events : ${item.events.available}</h2>
                               <h2>No. of Stories : ${item.stories.available}</h2>`;
    right.innerHTML+=`<h2 class="link"> <a style="color:navy;" href=${item.urls[0].url} target="_blank">Click here for more details</a></h2>`;
    
    // container.innerHTML+=`<button class="fav-btn" id="heart">
    //                 <p>Add to Favourites</p>
    //                 <i class="fa fa-heart-o"></i></button>
    //         </div>`;
                      
    
}


(function() {
    const heart = document.getElementById('heart');
    heart.addEventListener('click', function(event) {
    heart.classList.toggle('red');
	const target = event.target;
    let arr = [];
    //If the clicked Element is the Heart Icon
    if (target.classList.contains("fav-btn")) {
        var resp=getParams(window.location.href);
        addItemToLS(resp.id);  
    }
});
})();