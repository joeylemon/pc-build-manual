// Reference a text in HTML with <%- ref("ESA") %>
const references = {
    "ESA": `"2019 Essential Facts About the Computer and Video Game Industry.” <i>Entertainment Software Association</i>, Entertainment Software Association, 19 Aug. 2019, Available: https://www.theesa.com/esa-research/2019-essential-facts-about-the-computer-and-video-game-industry/.`,

    "Kuck": `D. J. Kuck, <i>The structure of computer and computations</i>. New York: Wiley, 1978.`,

    "Soper": `M. E. Soper, “RAM Types and Features,” <i>Pearson IT Certification</i>, 19-Nov-2016. [Online]. Available: https://www.pearsonitcertification.com/articles/article.aspx?p=2738309.`,

    "LEI": `L. E. I. Technology, “Types of Motherboard Form Factors,” <i>Lanner</i>, 19-Mar-2020. [Online]. Available: https://www.lanner-america.com/blog/types-motherboard-form-factors/. `,

    "Harding": `S. Harding, “What Is an M.2 SSD? A Basic Definition,” <i>Tom's Hardware</i>, 24-Jan-2020. [Online]. Available: https://www.tomshardware.com/reviews/glossary-m2-definition,5887.html.`,

    "Hirsch": `R. Hirsch, <i>Exploring colour photography: a complete guide</i>. London: Laurence King, 2005.`,

    "Newegg": `“Newegg – Shopping Upgraded,” Newegg.com. [Online]. Available: https://newegg.com/.`,

    "Microcenter": `"Micro Center - Computers and Electronic Device Retailer,” Microcenter.com. [Online]. Available: https://microcenter.com/.`,

    "LTT": `<i>ULTIMATE Cable Management Guide</i>. Linus Tech Tips, 2018. Available: https://www.youtube.com/watch?v=HkB-GNEt9Fk.`,

    "B. Hale": `B. Hale, “How to Cable Manage A PC: 27 Examples of Good Cable Management,” <i>Tech Guided</i>, 13-Aug-2019. [Online]. Available: https://techguided.com/good-cable-management/.`,

    "E. PC": `E. PC, “How Does Cable Management Affect Airflow?,” <i>Does Cable Management Matter?</i>. [Online]. Available: https://www.easypc.io/pc-cases/does-cable-management-matter/.`,

    "A. E. Freedman": `A. E. Freedman, “How to Build a PC,” <i>Tom's Hardware</i>, 26-Aug-2020. [Online]. Available: https://www.tomshardware.com/reviews/how-to-build-a-pc,5867.html.`,

    "MSI": `<i>PC Build Tutorial (Full Version) | MSI</i>. MSI Gaming, 2017. Available: https://www.youtube.com/watch?v=qCPIEYfN_hc.`,

    "Cutress": `D. I. Cutress and G. Bonshor, “Overclocking The AMD Ryzen APUs: Guide and Results," 16-Apr-2018. [Online]. Available: https://www.anandtech.com/show/12542/overclocking-the-amd-ryzen-apus-guide-results/4.`
}

// Replace links with appropriate HTML tags
for (const key of Object.keys(references))
    references[key] = references[key].replace(/Available: (.*)\./, `Available: <a href="$1" target="_blank">$1</a>`)

module.exports = references