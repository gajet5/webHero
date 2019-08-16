module.exports = {
    1: {
        name: 'Скелет',
        hp: 81,
        pAtk: 3,
        pDef: 12,
        mDef: 3,
        stats: {
            // Влияет на Маг.атаку
            int: 14,
            // Влияет на Физ.Атаку
            str: 5,
            // Влияет на Hp
            con: 13,
            // Влияет на MP
            men: 11,
            // Влияет на Уворот, Меткость
            dex: 7,
            // Влияет на удачу (резисты, крит и пр)
            luck: 9
        },
        dropList: [
            {
                category: 'etc',
                id: 1,
                count: [3, 7],
                chance: 70
            }
        ]
    }
};
