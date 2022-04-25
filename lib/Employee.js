
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        const roll = "Employee"
        if (roll == "Employee") {
            return "Employee";
        } else {
            return;
        }
    }
}

module.exports = Employee;
