module.exports = {
    async goToZone(ctx) {
        let data = JSON.parse(ctx.callbackQuery.data);
        ctx.session.state.huntingZoneId = data.id;
        await ctx.scene.enter('gameZonesHuntingInfo');
    }
};
