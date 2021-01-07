const get = require('../../fetch/fetch');
const { getLang } = require('../../utils/Variables');
/** Returns data on the region in JSON format.
 * @param {String} region 
 * @returns {Promise<JSON>} */
module.exports = async function getRegion(region) {
    if (isNaN(region)) {
        let regionData = await get(`region/${region.toLowerCase()}`);
        if (regionData !== undefined) {
            regionData.names = regionData.names.map(n => { return { language: n.language.name, name: n.name } });
            regionData.locations = regionData.locations.map(l => l.name);
            regionData.main_generation = regionData.main_generation.name
            regionData.pokedexes = regionData.pokedexes.map(p => p.name);
            regionData.games = regionData.version_groups.map(g => g.name);
            delete regionData.version_groups;
            delete regionData.id;
            if (getLang().length) {
                regionData.name = regionData.names.filter(n => n.language === getLang())[0].name;
                delete regionData.names;
            }
            return regionData;
        }
    }
    return undefined;
}