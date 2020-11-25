const express = require('express')
const app = express()
const fs = require('fs')
const { toTitle } = require("./utils.js")
const { pages, getNextPage, getLastPage } = require('./pages.js')

/**
 * Render an error alert at the top of the home page
 * @param {Response} res The express response object
 * @param {String} msg The error to display
 */
function renderError(res, msg) {
    res.render('index', {
        page: `content/home`,
        error: msg,
        pages: pages,
        lastPage: getLastPage("home"),
        nextPage: getNextPage("home")
    })
}

// Initialize express details
app.set('view engine', 'ejs')
app.use(express.static('./public'))

// Add helper functions to EJS
app.locals.ref = num => {
    return `<a href="references#${num}" style="color: #5d9dcc;">[${num}]</a>`
}

app.locals.def = (term, text) => {
    const id = term.replace(/ /g, "-").toLowerCase()
    const txt = text ? text : term
    return `<a href="home#def-${id}" style="color: #194e75;border-bottom: 1px dashed #194e75;">${txt}</a>`
}

app.locals.pgName = path => {
    const name = path.split("/")[1].replace(/-/g, " ")
    return toTitle(name)
}

/**
 * Render the home page
 */
app.get('/', function (req, res) {
    res.render('index', {
        page: `content/home`,
        pages: pages,
        lastPage: getLastPage("home"),
        nextPage: getNextPage("home")
    })
})

/**
 * Utilize EJS templates to render the desired page
 */
app.get('/:page', function (req, res) {
    if (!fs.existsSync(`./views/content/${req.params.page}.html`))
        return renderError(res, "The requested URL does not exist.")

    res.render('index', {
        page: `content/${req.params.page}`,
        pages: pages,
        lastPage: getLastPage(req.params.page),
        nextPage: getNextPage(req.params.page)
    })
})

app.listen(6077)
console.log('Listening on port :6077')