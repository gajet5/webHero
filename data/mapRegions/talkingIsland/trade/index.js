const path = require('path');

const buylist = path.join(__dirname, '..', 'buylist');
const pathToItems = path.join(__basedir, 'data', 'items');

module.exports = {
    info: {
        img: path.join(__dirname, '..', 'media', 'img', 'ti_merchant.jpg'),
        description: 'Описание торговой прощади города'
    },
    buylist: {
        armor: [],
        weapon: [],
        etc: ['1']
    }
};
