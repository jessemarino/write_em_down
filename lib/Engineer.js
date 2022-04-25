class Engineer {
    constructor (name, id, email, github) {
        this.github = github;
    }

    getGithub () {
        return this.github;
    }

    getRole() {
        const roll = "Engineer"
        if (roll == "Engineer") {
            return "Engineer";
        } else {
            return;
        }
    }
}

module.exports = Engineer;
