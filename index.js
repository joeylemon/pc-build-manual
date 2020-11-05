const express = require('express');
const app = express();
const fs = require('fs');

/**
 * Render an error alert at the top of the home page
 * @param {Response} res The express response object
 */
function renderError(res) {
    res.render('index', {
        page: `content/home`,
        error: "The requested URL does not exist."
    });
}

// Initialize express details
app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.get('/', function(req, res) {
    res.render('index', {
        page: `content/home`
    });
});

app.get('/:page', function(req, res) {
    if (!fs.existsSync(`./views/content/${req.params.page}.ejs`))
        return renderError(res)

    res.render('index', {
        page: `content/${req.params.page}`
    });
});

app.listen(6077);
console.log('6077 is the magic port');