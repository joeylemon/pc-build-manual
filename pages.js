class Page {
    constructor(title, sections) {
        this.title = title
        this.sections = sections
    }

    getID() {
        return this.title.replace(/ /g, "-").toLowerCase()
    }

    getPath() {
        return `content/${this.getID()}`
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

const pages = [
    new Page("Home", [
        "Introduction",
        "Table of Contents",
        "Terms"
    ]),
    new Page("Computer Parts", [
        "Introduction",
        "Functions of the Major Parts",
    ]),
    new Page("Choosing Parts", [
        "Introduction",
        "$500 Budget",
        "$1,000 Budget",
        "$1,500 Budget",
        "$2,000 Budget",
    ]),
    new Page("Cable Management", [
        "Introduction",
        "How to Manage Your Cables",
        "Cable Management Examples"
    ]),
    new Page("Assembly", [
        "Introduction",
        "CPU",
        "Memory",
        "CPU Cooler",
        "Motherboard",
        "GPU",
        "Storage",
        "Power Supply",
        "Testing",
    ]),
    new Page("Post Assembly", [
        "Introduction",
        "Checklist",
    ]),
    new Page("Maintenance", [
        "Introduction",
        "CPU Cooler",
        "GPU",
        "Power Supply",
        "Thermal Paste",
        "Accessories",
    ]),
    new Page("Upgrades and Replacements", [
        "Introduction",
        "Upgrading your Components",
        "Replacing your Components"
    ]),
    new Page("References", [
        "Works Cited"
    ]),
]

module.exports = {
    pages: pages,

    getLastPage: (id) => {
        const index = pages.findIndex(pg => pg.getID() === id)
        if (index === -1)
            throw new Error(`invalid page id given: ${id}`)

        if (index - 1 < 0)
            return undefined

        return pages[index - 1]
    },

    getNextPage: (id) => {
        const index = pages.findIndex(pg => pg.getID() === id)
        if (index === -1)
            throw new Error(`invalid page id given: ${id}`)

        if (index + 1 >= pages.length)
            return undefined

        return pages[index + 1]
    }
}