
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.especies = pokeDetail.name;
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;
    pokemon.abilities = pokeDetail.abilities.map((item) => capitalizeFirstLetter(item.ability.name)).join(', ')


    const genderRate = Number(pokeDetail.gender_rate)
    if (genderRate < 0) {
        pokemon.genderAgender = "100%";
        pokemon.genderFemale = 0;
        pokemon.genderMale = 0;
    } else {
        pokemon.genderAgender = "0.00";
        pokemon.genderFemale = (genderRate * 100 / 8) + "%";
        pokemon.genderMale = (100 * (8 - genderRate) / 8) + "%";
    }

    pokemon.eggGroups = pokeDetail.egg_groups?.map((item) => capitalizeFirstLetter(item.name)).join(', ') || "";


    return pokemon
}

pokeApi.getPokemonDetail = async (pokemon, id = null) => {

    let species;

    if (id) {
        species = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
            .then((response) => response.json())
    }

    const data = await fetch(pokemon.url)
        .then((response) => response.json())

    return convertPokeApiDetailToPokemon({
        ...species,
        ...data
    })
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(e => pokeApi.getPokemonDetail(e, null)))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
