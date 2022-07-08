import chroma from "chroma-js";

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

function generatePalette(startPalette)
{
    let newPalette = {
        paletteName: startPalette.paletteName,
        id: startPalette.id,
        emoji: startPalette.emoji,
        colors: {}
    }
    for (let l of levels)
    {
        newPalette.colors[l] = []
    }
    for (let c of startPalette.colors)
    {
        let scale = generateScale(c.color, 10).reverse();
        for (let i in scale)
        {
            newPalette.colors[levels[i]].push(
                {
                    name: `${c.name} ${levels[i]}`,
                    id: c.name.toLowerCase().replace(/ /g, "-"),
                    hex: scale[i],
                    rgb: chroma(scale[i]).css(),
                    rgba: chroma(scale[i]).css().replace("rgb", "rgba").replace(")", ",1.0)")
                }
            )
        }
    }
    return newPalette;
}

function getRange(hexColor)
{
    const end = "#fff";
    return [
        chroma(hexColor).darken(1.4).hex(),
        hexColor,
        end
    ]
}

function generateScale(hexColor, numColors)
{
    return chroma.scale(getRange(hexColor)).mode("lab").colors(numColors);
}


export { generatePalette };