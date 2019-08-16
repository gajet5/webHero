module.exports = {
    zones: {
        1: {
            info: {
                name: 'Портовые стены',
                description: 'Описание зоны'
            },
            npcs: [
                {
                    id: 1,
                    chance: 70
                }
            ]
        },
        2: {
            info: {
                name: 'Дорога к городу',
                description: 'Описание зоны'
            },
            npcs: {
                id: 1,
                chance: 10
            }
        },
        3: {
            info: {
                name: 'Укреплённый замок',
                description: 'Описание зоны'
            },
            npcs: {
                id: 1,
                chance: 10
            }
        }
    }
};
