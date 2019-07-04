module.exports = {
    alreadyRegistered(username) {
        return `Ты уже зарегистрирован под ником ${username}`;
    },
    newUser(firsName, username) {
        return `Добро пожаловать ${firsName} ты зарегистрирован под ником ${username}`;
    }
};
