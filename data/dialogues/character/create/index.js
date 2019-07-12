module.exports = {
    startDialog() {
        return `
        Добро пожаловать в меню создания персонажа.
        `;
    },
    startCreateCharacter() {
        return `
        Настало время кинуть кости и посмотреть как лягут статы.
        `;

    },
    chacterIsCreated(stats) {
        return `
        Ваш интилект ${stats.int}
        Ваша сила ${stats.str}
        Ваша телосложение ${stats.con}
        Ваша сила разума ${stats.men}
        Ваш локовсть ${stats.dex}
        Ваше везение ${stats.wit}
       `;
    }

};

