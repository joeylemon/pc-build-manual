// Holds task numbers for price last updated times
let priceUpdateTasks = {}

/**
 * Open or close the sidebar navigation
 * @param {Boolean} open Whether or not to open the sidebar
 */
function setSidebarOpened(open) {
    document.cookie = `sidebar=${!open}`
    if (open && !$("#sidebar").hasClass("active")) {
        $("#sidebar").addClass("active")
    } else if (!open && $("#sidebar").hasClass("active")) {
        $("#sidebar").removeClass("active")
    }
}

/**
 * Loop through text elements and sum the total word count on the current page
 */
function getWordCount() {
    let words = 0
    $(".card-body").each((i, obj) => {
        words += obj.innerText.split(/\s/).filter(function (txt) { return /\S/.test(txt) }).length
    })
    return words
}

/**
 * Load the latest part prices from pcbuilder.net and update the HTML
 * @param {String} range The price range to refresh (e.g. 500, 1000, etc)
 */
function refreshPrices(range) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `prices/refresh/${range}`,
            success: (resp) => {
                updatePriceHTML(range, resp)
                resolve()
            },
            error: (xhr, err) => {
                console.error(xhr.status, "could not get prices")
                $(`#${range}-last-updated`).html(`<span style="color: red">There was an error retrieving the prices.</span>`)
                reject()
            }
        })
    })
}

/**
 * Load the last saved prices and update the HTML
 */
function loadSavedPrices() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `prices/saved`,
            success: (resp) => {
                for (const range of Object.keys(resp))
                    updatePriceHTML(range, resp[range])
                resolve()
            },
            error: (xhr, err) => {
                console.error(xhr.status, "could not get prices")
                reject()
            }
        })
    })
}

/**
 * Update the prices for a build's HMTL
 * @param {String} range The price range to update (e.g. 500, 1000, etc)
 * @param {Object} build The build object containing prices, last updated time, and the build url
 */
function updatePriceHTML(range, build) {
    let sum = 0
    for (const component of Object.keys(build.prices)) {
        const price = build.prices[component]
        sum += price
        $(`#${range}-${component.toLowerCase()}-price`).html("$" + price.toFixed(2))
    }
    $(`#${range}-total-price`).html("$" + sum.toFixed(2))
    $(`#${range}-last-updated`).html(`Prices last updated ${moment(build.lastUpdated).fromNow()}.`)

    if (priceUpdateTasks[range])
        clearInterval(priceUpdateTasks[range])

    priceUpdateTasks[range] = setInterval(() => {
        $(`#${range}-last-updated`).html(`Prices last updated ${moment(build.lastUpdated).fromNow()}.`)
    }, 30000)
}

$(document).ready(function () {

    // Collapse or expand the sidebar when the hamburger button is clicked
    $('#sidebarCollapse').on('click', function () {
        setSidebarOpened(!$('#sidebar').hasClass("active"))
    })

    // Calculate word count and set text at bottom of page
    $('#word-count').html(getWordCount())

    // If on references or home page, highlight given reference or definition
    if (window.location.hash) {
        const hash = window.location.hash.replace('#', '')

        if ((window.location.href.includes("references") && hash.length <= 2) ||
            (window.location.href.includes("home") && hash.startsWith("def-"))) {
            $(`#${hash}`).css({ backgroundColor: "#feffb2" })
        }
    }

    // Retrieve saved part prices when looking at part lists
    if (window.location.href.includes("choosing-parts")) {
        loadSavedPrices()

        // Refreshes part prices when user clicks button
        $("[id$=-refresh]").on('click', function () {
            const $elem = $(this)
            const range = $elem.attr("id").split("-")[0]

            $elem.find("svg").addClass("spinning")

            // Set all prices to ellipses
            $(`[id^=${range}-][id$=-price]`).html("...")
            $elem.prop("disabled", true)

            refreshPrices(range).finally(() => {
                $elem.prop("disabled", false)
                $elem.find("svg").removeClass("spinning")
            })
        })
    }

})