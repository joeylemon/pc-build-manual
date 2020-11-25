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

})

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