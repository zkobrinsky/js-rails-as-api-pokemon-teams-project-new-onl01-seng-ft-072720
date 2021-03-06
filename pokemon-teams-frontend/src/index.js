const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
loadTrainers()



function loadTrainers() {
    const configObj = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch(TRAINERS_URL, configObj)
        .then(resp => resp.json())
        .then(dataset => displayTrainerCards(dataset))
}

function displayTrainerCards(dataset) {
    dataset.forEach(data => {
        const name = data.name
        const pokemons = data.pokemons

        const main = document.querySelector("body > main");
        const card = document.createElement("div")
        card.className = "card";
        card.dataset.id = data.id
        main.append(card)

        const p = document.createElement("p")
        p.innerText = name
        
        card.append(p)

        const button = document.createElement("button")
        button.dataset.trainerId = data.id
        button.innerText = "Add Pokemon"
        card.append(button)

        const ul = document.createElement("ul")
        card.append(ul)

        displayPokemons(pokemons, ul)

        button.addEventListener("click", createPokemon) 
    })

}

function displayPokemons(pokemons, ul) {
    pokemons.forEach(pokemon => displayPokemon(pokemon, ul))
}

function displayPokemon(pokemon, ul) {
    const li = document.createElement("li")
    const button = document.createElement("button")
    button.className = "release"
    button.dataset.pokemonId = pokemon.id
    button.innerText = "Release"

    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    ul.append(li)
    li.appendChild(button)

    button.addEventListener("click", deletePokemon) 
}


function createPokemon(event) {
    const trainer_id = event.target.dataset.trainerId;
    const ul = event.target.parentElement.childNodes[2];
    const pokemonCount = event.target.parentElement.childNodes[2].childElementCount;
    
    if (pokemonCount < 6) {
        fetch("http://localhost:3000/pokemons", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                trainer_id: trainer_id
            })
            })
        .then(resp => resp.json())
        .then(pokemon => displayPokemon(pokemon, ul))
    } else {
        alert("That trainer already has six pokemon");
    }

}


function deletePokemon(event){
    const pokemonId = event.target.dataset.pokemonId;

    fetch(`http://localhost:3000/pokemons/${pokemonId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
            })
            // .then(resp => resp.json())
            .then(event.target.parentElement.remove())

}