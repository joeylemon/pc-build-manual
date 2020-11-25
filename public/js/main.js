$(document).ready(function () {

    // Collapse or expand the sidebar when the hamburger button is clicked
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active')
    })

    // If on references page, highlight given reference in URL
    if (window.location.href.includes("references") && window.location.hash) {
        const hash = window.location.hash.replace('#', '')
        if (hash.length > 2) return;
        
        $(`#${hash}`).css({backgroundColor: "#feffb2"})
    }

    // If on home page, highlight given definition in URL
    if (window.location.href.includes("home") && window.location.hash) {
        const hash = window.location.hash.replace('#', '')
        if (!hash.includes("def")) return;
        
        $(`#${hash}`).css({backgroundColor: "#feffb2"})
    }

    // Calculate word count and set text at bottom of page
    $('#word-count').html(getWordCount())

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