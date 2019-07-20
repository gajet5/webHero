const path = require('path');

module.exports = async (character) => {
    const pathToMapRegions = path.join(__basedir, 'data', 'mapRegions');
    return require(path.join(pathToMapRegions, character.mapRegion, character.zone));
};
