// var MD5 = require("crypto-js/md5"); 
// console.log(MD5("text to hash").toString());
const fetchCharacterApi = "https://gateway.marvel.com/v1/public/characters";
const ts = 1;
const publicKey = "d6d00f7e656233af849ed35ec0924aed";
// const private1 = "aa31c31d17e205848965ed210a5a7fceda75263b";
const hash = "781fb025e03b0ebeaac787569d892bfd";

var superheroArrayList = [];

const superheroList = document.getElementById("superhero-list");
const searchKey = document.getElementById("search-key");

async function fetchAllSuperhero(){
    var resp = await fetch(`${fetchCharacterApi}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);

    var data = await resp.json();

    var results = data.data.results;

    superheroArrayList = results;

    addToList(results);
}

async function fetchSuperheroWithName(name){
    var resp = await fetch(`${fetchCharacterApi}?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${name}`);

    var data = await resp.json();

    var results = data.data.results;

    superheroArrayList = results;

    addToList(results);
}

function addToList(results){
    superheroList.innerHTML= "";
    const li = document.createElement('li');
    results.map((item)=>{
        const li = document.createElement('li');
        li.innerHTML = `<div class="list-container">
        <a target="_self" href="./info/info.html?id=${item.id}">
                            <img src=${item.thumbnail.path}.${item.thumbnail.extension}  /></a>
                            <a target="_self" href="./info/info.html?id=${item.id}"> <button>  ${item.name}  </button> </a>
                        </div>` ;

        superheroList.append(li);
    })}

    searchKey.addEventListener('keyup', ()=>{
        const searchKeyVal = searchKey.value.trim();
        
        if (searchKeyVal ==0){
            fetchAllSuperhero();
        }
    
        if(searchKeyVal.length < 2){
            return;
        }
        fetchSuperheroWithName(searchKeyVal);
    })
    
    fetchAllSuperhero();
    