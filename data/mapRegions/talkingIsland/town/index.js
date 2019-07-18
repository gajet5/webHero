module.exports = {
    actions: {
        getMerchants: {
            text: 'Торговать',
            handler: async (ctx) => {
                await ctx.reply('Торговать ага ща, разбежался');
            }
        },
        getInformations: {
            text: 'Распросить местных',
            handler: async (ctx) => {}
        },
        goHunting: {
            text: 'Охота',
            handler: async (ctx) => {}
        },
        goAnotherTown: {
            text: 'Отправиться в другой город',
            handler: async(ctx) => {}
        }
    }
};
