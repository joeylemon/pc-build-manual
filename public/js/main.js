$(document).ready(function () {

    // Collapse or expand the sidebar when the hamburger button is clicked
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active')
    })

    // Calculate word count and set text at bottom of page
    $('#word-count').html(getWordCount())

    $.ajax({
        url: "https://pcpartpicker.com/product/K8fhP6/msi-geforce-gtx-1660-ti-6-gb-gaming-x-video-card-gtx-1660-ti-gaming-x-6g",
        method: "get"
    }).done(() => {
        // $(".td__logo").each((i, obj) => {
        //     console.log(obj.children[0].children[0].src)
        //     console.log(obj.nextElementSibling.innerText)
        // })
        console.log("done")
    })

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