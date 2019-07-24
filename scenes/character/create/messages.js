module.exports = {
    stats(stats) {
        return `
Ваш интилект ${ stats.int }
Ваша сила ${ stats.str }
Ваша телосложение ${ stats.con }
Ваша сила разума ${ stats.men }
Ваш локовсть ${ stats.dex }
Ваше везение ${ stats.luck }
        `
    }
};
