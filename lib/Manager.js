class Manager {
    constructor(name, id, email, office) {    
        this.officeNumber = office;
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    getRole() {
        const roll = "Manager";
        if (roll == "Manager") {
            return "Manager";
        } else {
            return;
        }
    }
}

module.exports = Manager;
