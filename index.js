const express = require('express')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const priceEndpoint = require("./prices/prices.js")
const { toTitle } = require("./utils.js")
const { pages, getNextPage, getLastPage } = require('./pages.js')
const references = require("./references.js")

const app = express()
app.use(cookieParser())

/**
 * Return an HTML file to the response containing the rendered page template
 * @param {Request} req The request object from express
 * @param {Response} res The response object from express
 * @param {String} page The page to render
 * @param {String} err The error, if any, to include in the page
 */
function renderPage(req, res, page, err) {
    res.render('index', {
        page: `content/${page}`,
        pages: pages,
        lastPage: getLastPage(page),
        nextPage: getNextPage(page),
        references: references,
        cookies: req.cookies,
        error: err
    })
}

/**
 * Render an error alert at the top of the home page
 * @param {Request} req The request object from express
 * @param {Response} res The response object from express
 * @param {String} msg The error to display
 */
function renderError(req, res, msg) {
    renderPage(req, res, "home", msg)
}

// Initialize express details
app.set('view engine', 'ejs')
app.use(express.static('./public'))

// EJS helper function to add a link to source reference
// Reference a text in HTML with <%- ref("ESA") %>
app.locals.ref = name => {
    const idx = Object.keys(references).findIndex(key => key === name)
    if (idx === -1)
        throw new Error(`invalid reference id ${name}`)

    return `<a href="references#${idx+1}" style="color: #5d9dcc;">[${idx+1}]</a>`
}

// EJS helper function to add a link to a term definition
// Link to a definition with <%- def("CPU") %> or <%- def("CPU", "processor") %>
app.locals.def = (term, text) => {
    const id = term.replace(/ /g, "-").toLowerCase()
    const txt = text ? text : term
    return `<a href="home#def-${id}" style="color: #194e75;border-bottom: 1px dashed #194e75;">${txt}</a>`
}

// EJS helper function to get the name of a page from its path (e.g. content/home)
app.locals.pgName = path => {
    const name = path.split("/")[1].replace(/-/g, " ")
    return toTitle(name)
}

/**
 * Set up price endpoint
 */
app.use("/prices", priceEndpoint)

/**
 * Render the home page
 */
app.get('/', function (req, res) {
    renderPage(req, res, "home")
})

/**
 * Utilize EJS templates to render the desired page
 */
app.get('/:page', function (req, res) {
    if (!fs.existsSync(`./views/content/${req.params.page}.html`))
        return renderError(req, res, `The requested page, ${req.params.page}, does not exist.`)

    renderPage(req, res, req.params.page)
})

app.listen(6077)
console.log('Listening on port :6077')