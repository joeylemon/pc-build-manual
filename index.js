const express = require('express');
const app = express();
const fs = require('fs');
const pages = require('./pages.js');

/**
 * Render an error alert at the top of the home page
 * @param {Response} res The express response object
 * @param {String} msg The error to display
 */
function renderError(res, msg) {
    res.render('index', {
        page: `content/home`,
        error: msg
    });
}

// Initialize express details
app.set('view engine', 'ejs');
app.use(express.static('./public'));

/**
 * Render the home page
 */
app.get('/', function(req, res) {
    res.render('index', {
        page: `content/home`,
        pages: pages
    });
});

/**
 * Utilize EJS templates to render the desired page
 */
app.get('/:page', function(req, res) {
    if (!fs.existsSync(`./views/content/${req.params.page}.ejs`))
        return renderError(res, "The requested URL does not exist.")

    res.render('index', {
        page: `content/${req.params.page}`,
        pages: pages
    });
});

app.listen(6077);
console.log('6077 is the magic port');