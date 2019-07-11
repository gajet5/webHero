module.exports = {
    alreadyRegistered(username) {
        return `
        У тебя есть персонаж, ${ username }, хочешь продолжить или начать новое приключение?
        `;
    },
    newUser(firsName, username) {
        return `
        Добро пожаловать ${ firsName } ты зарегистрирован под ником ${ username }, начни своё приключение!
        `;
    }
};
