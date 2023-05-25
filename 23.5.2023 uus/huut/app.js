
var pokemonList = [];

var handledPokemon = null;

var displayList = [];



document.getElementById("searchBtn").addEventListener("click", function(event) {
   
    event.preventDefault();
    searchByText();
})

if(localStorage.getItem("displayList")){
    displayList = JSON.parse(localStorage.getItem("displayList"));

    for (let i = 0; i < displayList.length; i++) {
        displayPokemon(displayList[i]);
    }
}



function searchByText() {
  
    const searchText = document.getElementById("search").value;

   
    if (searchText == "") {
        alert("Please type a Pokemon name to search.");
    }
    else {
       
        checkLocalStorage(searchText);
    }
}

function checkLocalStorage(searchText) {
    

   
    if(localStorage.getItem("pokemonList") == null) {
        getDataFromAPI(searchText);
        return;
    }
   
    pokemonList = JSON.parse(localStorage.getItem("pokemonList"));
  


    let matchFound = false;

    for (let index = 0; index < pokemonList.length; index++) {
        const pokemon = pokemonList[index];
      
        if(pokemon.name === searchText) {
           
            handledPokemon = pokemon;
            matchFound = true;
            
            break;
        }
    }
   
    if(matchFound === true) {
        
        for (let i = 0; i < displayList.length; i++) {
            if(displayList[i].name === searchText) {
              
                return;
            }
        }

       
        displayPokemon(handledPokemon);
      
        displayList.push(handledPokemon);
        localStorage.setItem("displayList", JSON.stringify(displayList));
    }
    else {
    
        getDataFromAPI(searchText);
    }
}

async function getDataFromAPI(searchText) {
   
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchText}`);
   
    const jsonData = await response.json();
   
    pokemonList.push(jsonData);

    localStorage.setItem("pokemonList", JSON.stringify(pokemonList));

    displayPokemon(jsonData);

    displayList.push(jsonData);
    localStorage.setItem("displayList", JSON.stringify(displayList));
}


async function getAllPokemonData() {

    if( localStorage.getItem("allPokemonData") == null) { 
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1281");
        const jsonData = await response.json();
        localStorage.setItem("allPokemonData", JSON.stringify(jsonData));
    }
    displayAllNamesList();
}

getAllPokemonData();



function displayPokemon(pokemon) {
    console.log("Displaying:" + pokemon.name);

    let pokeBox = document.createElement("div");

    pokeBox.innerHTML = `
    <h2 class="pokeTitle">${pokemon.name}</h2>
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" class="pokeImage">
    `;

    document.getElementById("pokeList").appendChild(pokeBox);
}


function displayAllNamesList() {
   
    const namesData = JSON.parse(localStorage.getItem("allPokemonData"));
    

    let namesList = document.getElementById("list");
    for (let i = 0; i < namesData.results.length; i++) {
        namesList.innerHTML += `<li><a href="${namesData.results[i].url}">${namesData.results[i].name}</a></li>`;
    }

    const pokemonNames = namesData.results.map(pokemon => pokemon.name);
    const dataList = document.getElementById("pokemonNames");
    pokemonNames.forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        dataList.appendChild(option);
    });
    var pokemonList = [];
var handledPokemon = null;
var displayList = [];

document.getElementById("searchBtn").addEventListener("click", function(event) {
    event.preventDefault();
    searchByText();
});

document.getElementById("toggleBtn").addEventListener("click", function(event) {
    event.preventDefault();
    togglePokemonDisplay();
});

// ...

function togglePokemonDisplay() {
    var pokeList = document.getElementById("pokeList");
    if (pokeList.style.display === "none") {
        pokeList.style.display = "block";
    } else {
        pokeList.style.display = "none";
    }
}

// ...

}