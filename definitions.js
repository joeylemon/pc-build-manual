const logger = require("./logger.js")
const { getReferenceLink } = require("./references.js")

const MAX_TOOLTIP_LENGTH = 200

const definitions = {
    "CPU": `Short for "central processing unit," the CPU is the component that executes all of the regular instructions of a computer ${getReferenceLink("Kuck")}.`,

    "GPU": `Short for "graphics processing unit," the GPU is the component within a computer that accelerates the creation of images intended for output to a display device ${getReferenceLink("Kuck")}. As such, it is extremely important for rendering video games faster and at higher resolutions.`,

    "PSU": `Short for "power supply unit," the PSU converts wall outlet AC (alternating current) power to DC (direct current) power, which is what computer components require to run properly ${getReferenceLink("Kuck")}.`,
   
    "RAM": `Short for "random access memory," RAM is the component within a computer that is typically used to store working data and machine code ${getReferenceLink("Kuck")}. It is installed in the DIMM (dual in-line memory module) slots on a motherboard. RAM has been released in different generations, with the latest being Double Data Rate 5 (DDR5). The previous generations are DDR4, DDR3, DDR2, and DDR ${getReferenceLink("Soper")}. The acronym DDR4-3600 means a set of RAM is in the fourth generation and runs at 3600 MHz.`,
   
    "SATA": `Short for "serial advanced technology attachment," SATA cables are in charge of connecting storage devices (hard disk drives and solid state drives) to the motherboard, providing the ability to read and write from them ${getReferenceLink("Kuck")}.`,
   
    "Form factor": `Motherboards come in different standard sizes, from largest to smallest: EATX, ATX, Micro-ATX (mATX), and Mini-ATX ${getReferenceLink("LEI")}. Cases are typically designed for specific form factors.`,
   
    "Storage": `The most common storage devices are hard disk drives (HDDs) and solid state drives (SSDs). The former uses a physical disk and magnetism to store data, while the latter uses many semiconductor chips to store data ${getReferenceLink("Kuck")}. SSDs are typically faster than HDDs. Both are commonly connected to the motherboard with SATA cables, but there is a newer M.2 SSD standard connecting directly to the motherboard in a dedicated slot ${getReferenceLink("Harding")}.`,
   
    "Capacity": `Information on a computer is stored in units called bytes. Bytes are a collection of eight bits (ones and zeroes), with megabytes (MBs) being one million bytes, gigabytes (GBs) being one billion bytes, and terabyte (TBs) being one trillion bytes ${getReferenceLink("Kuck")}. Storage devices are advertised by their capacity, typically in the hundreds of gigabytes. RAM, on the other hand, is advertised in the tens of gigabytes, since they have a much smaller capacity but an extremely faster speed.`,
   
    "Resolution": `Computer monitors contain millions of pixels that can each represent different colors. The pixel resolution for a monitor describes exactly how many pixels it contains; with a higher pixel resolution, there will be a clearer and more detailed image on the screen. These resolutions are described by their width and height values, with common pixel resolutions being: 1080p (1920 x 1080), 1440p/2K (2560 x 1440), 4K (3840 x 2160) ${getReferenceLink("Hirsch")}.`,
   
    "Clock speed": `Computer components are often described with their clock speed, such as the CPU, GPU, or RAM. Clock speed describes the speed of electronic transmission, measured in hertz (cycles per second) ${getReferenceLink("Kuck")}. Megahertz (MHz) is one million hertz and gigahertz (GHz) is one billion hertz. Typically, a component with a higher clock speed will perform faster.`,
   
    "BIOS": `Short for "basic input/output system," the BIOS is pre-installed on every motherboard and allows hardware-level system configuration, such as setting clock speeds or selecting which storage device to use to boot into an operating system (such as Windows) ${getReferenceLink("Kuck")}.`,
   
    "RGB": `Short for "red/green/blue," RGB describes the three colors that can be combined to create any other color ${getReferenceLink("Hirsch")}. Typically, RGB is used as shorthand for describing RGB LEDs (light-emitting diodes), which are light sources that are often used to add accent lighting to computer builds.`,
   
    "Aftermarket": `Aftermarket items are those that are purchased separately from a certain component. A common example is an aftermarket CPU cooler, which is bought separately from a CPU (many CPUs come with a stock cooler).`,
}

module.exports = {
    definitions: definitions,

    getDefinition: term => {
        let def = definitions[Object.keys(definitions).find(key => key.toLowerCase() === term.toLowerCase())]
        if (!def) {
            logger.print(`could not find definition for term ${term}`)
            return "An error occurred while searching for the definition of this term."
        }

        // Replace reference links with just the reference number
        def = def.replace(/<a href="references#(\w+)" .*<\/a>/, "[$1]")

        // Truncate the definition if it's too long
        if (def.length > MAX_TOOLTIP_LENGTH)
            def = def.slice(0, MAX_TOOLTIP_LENGTH) + "..."

        return def
    }
}