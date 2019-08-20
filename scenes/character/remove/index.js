const path = require('path');
const Scene = require('telegraf/scenes/base');

const accountsModel = require(path.join(__basedir, 'models', 'accounts'));
const charactersModel = require(path.join(__basedir, 'models', 'characters'));
const charactersItemsModel = require(path.join(__basedir, 'models', 'charactersItems'));
const charactersEquipmentModel = require(path.join(__basedir, 'models', 'charactersEquipment'));
const charactersSkillsModel = require(path.join(__basedir, 'models', 'charactersSkills'));

module.exports = new Scene('characterRemove')
    .enter(async (ctx) => {
        await accountsModel.findByIdAndUpdate(ctx.session.account.id, { haveCharacter: false });
        await charactersItemsModel.deleteMany({ owner: ctx.session.character.id });
        await charactersEquipmentModel.deleteMany({ owner: ctx.session.character.id });
        await charactersSkillsModel.deleteMany({ owner: ctx.session.character.id });
        await charactersModel.deleteMany({ account: ctx.session.account.id });
        await ctx.scene.enter('account');
    })
    .leave((ctx) => {
        ctx.session.scenes.previous = ctx.session.__scenes.current;
    });
