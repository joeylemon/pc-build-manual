class Page {
    constructor(title, sections) {
        this.title = title
        this.sections = sections
    }

    getID() {
        return this.title.replace(/ /g, "-").toLowerCase()
    }

    getSections() {
        return this.sections.map(str => {
            return {
                title: str,
                id: str.replace(/ /g, "-").toLowerCase()
            }
        })
    }
}

module.exports = [
    new Page("Home", [
        "Introduction", 
        "Table of Contents"
    ]),
    new Page("Cable Management", [
        "Introduction", 
        "How to Manage Your Cables",
        "Cable Management Examples"
    ]),
    new Page("Maintenance", [
        "Introduction", 
        "CPU Cooler", 
        "GPU", 
        "Power Supply", 
        "Thermal Paste", 
        "Accessories", 
    ]),
    new Page("Computer Parts", [
        "Introduction", 
        "Functions of the Major Parts",
    ]),
]