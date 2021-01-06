const get = require('../../fetch/fetch');
const { formatPokemon } = require('../../utils/utils');

/** @param {String} pokemon */
module.exports = async function getSprites(pokemon) {
    let call = await formatPokemon(pokemon)
    let pokeData = await get(`pokemon/${call}`);
    if (pokeData !== undefined) return pokeData.sprites;
    return undefined; 
}