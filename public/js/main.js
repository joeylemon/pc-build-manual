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
 * Update the prices for a build's HMTL
 * @param {String} range The price range to update (e.g. 500, 1000, etc)
 * @param {Object} obj The build object containing prices, last updated time, and the build url
 */
function updatePrices(range, obj) {
    let sum = 0
    for (const component of Object.keys(obj.prices)) {
        const price = obj.prices[component]
        sum += price
        $(`#${range}-${component}-price`).html("$" + price)
    }
    $(`#${range}-total-price`).html("$" + sum.toFixed(2))
    $(`#${range}-last-updated`).html(`Prices last updated ${moment(obj.lastUpdated).fromNow()}.`)
}

$(document).ready(function () {

    // Collapse or expand the sidebar when the hamburger button is clicked
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active')
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
        $.ajax({
            url: `prices/saved`,
            success: (resp) => {
                for (const range of Object.keys(resp))
                    updatePrices(range, resp[range])
            },
            error: (xhr, err) => {
                console.error(xhr.status, "could not get prices")
            }
        })
    }

    // Refreshes part prices when user clicks button
    $("[id$=-refresh]").on('click', function () {
        const range = $(this).attr("id").split("-")[0]

        $(this).prop("disabled", true)

        $.ajax({
            url: `prices/refresh/${range}`,
            success: (resp) => {
                updatePrices(range, resp)
                $(this).prop("disabled", false)
            },
            error: (xhr, err) => {
                console.error(xhr.status, "could not get prices")
                $(this).prop("disabled", false)
            }
        })
    })

})