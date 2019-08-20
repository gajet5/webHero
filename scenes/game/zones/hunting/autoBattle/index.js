const path = require('path');
const Scene = require('telegraf/scenes/base');
const Chance = require('chance');

const charactersModel = require(path.join(__basedir, 'models', 'characters'));
const charactersEquipmentModel = require(path.join(__basedir, 'models', 'charactersEquipment'));
const sceneCleaner = require(path.join(__basedir, 'utils', 'sceneCleaner'));
const npcs = require(path.join(__basedir, 'data', 'npcs'));
const itemsData = require(path.join(__basedir, 'data', 'items'));
const gameCfg = require(path.join(__basedir, 'config', 'game'));

module.exports = new Scene('gameZonesHuntingAutoBattle')
    .enter(async ctx => {
        //todo: Тип урона? Что определяет.
        //todo: Прописать условия в коде.
        const chance = new Chance();
        const msgs = [];
        const character = await charactersModel.findById(ctx.session.character.id);
        const equipment = await charactersEquipmentModel.findOne({ owner: character });
        const opponent = npcs[ctx.session.state.opponentId];

        opponent.stats = {
            int: chance.integer({ min: 3, max: 18}),
            str: chance.integer({ min: 3, max: 18}),
            con: chance.integer({ min: 3, max: 18}),
            men: chance.integer({ min: 3, max: 18}),
            dex: chance.integer({ min: 3, max: 18}),
            luck: chance.integer({ min: 3, max: 18})
        };

        let characterHp = character.curHp;
        let characterPAtk = 0;
        let characterMAtk = 0;
        let characterPDef = 0;
        let characterMDef = 0;
        let enemyHp = opponent.stats.con * gameCfg.rateHp;

        for (let i = 0; i < equipment.length; i += 1) {
            console.log(equipment[i])
        }

        for (let category in equipment) {
            if (!/weapons|armors/.test(category)) {
                continue;
            }
            
            for (let item in equipment[category]) {
                if (category === 'armors') {
                    if (!item.equipped) {
                        characterPDef += 1;
                        characterMDef += 1;
                        continue;
                    }

                    characterPDef += itemsData[category][item.id].stats.pDef;
                    characterMDef += itemsData[category][item.id].stats.mDef;
                } else if (category === 'weapons') {
                    if (!item.equipped) {
                        characterPAtk += 1;
                        characterMAtk += 1;
                        continue;
                    }
                    //todo: проверка для щита

                    characterPDef += itemsData[category][item.id].stats.pAtk;
                    characterMDef += itemsData[category][item.id].stats.mAtk;
                }
            }
        }

        let enemyDmg = (opponent.pAtk + opponent.stats.str) - characterPDef;
        enemyDmg = enemyDmg > 0 ? enemyDmg : 0;
        let characterDmg = (characterPAtk + character.stats.str) - opponent.pDef;
        characterDmg = characterDmg > 0 ? characterDmg : 0;

        while (true) {
            if (characterHp < 0 || enemyHp < 0) {
                break;
            }

            enemyHp -= characterDmg;
            characterHp -= enemyDmg;
        }


        ctx.session.messages.push(...msgs);
    })
    .leave(ctx => {
        ctx.session.scenes.previous = ctx.session.__scenes.current;
        sceneCleaner(ctx);
    });
