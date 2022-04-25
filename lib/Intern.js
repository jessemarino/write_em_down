class Intern {
    constructor(name, id, email, school) {
        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    getRole () {
        const roll = "Intern"
        if (roll == "Intern") {
            return "Intern";
        } else {
            return;
        }
    }
}

module.exports = Intern;
