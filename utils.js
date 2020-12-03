module.exports = {
    sleep: ms => {
        return new Promise(resolve => {
            setTimeout(resolve, ms)
        })
    },
    toTitle: str => {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
            }
        )
    },
    toID: str => {
        return str.replace(/ /g, "-").toLowerCase()
    },
    getTimeCST: () => {
        const now = new Date()
        now.setHours(now.getHours() - 6)
        return now
    }
}