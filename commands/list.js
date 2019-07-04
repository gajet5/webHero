module.exports = {
    commands: {
        start: 'start',
        settings: 'settings',
        help: 'help'
    },
    getCmdStr(key, slash = true) {
        return slash ? `/${this.commands[key]}` : this.commands[key];
    }
};
