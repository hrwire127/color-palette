import React, { Component, useState, setState } from 'react';
import Box from './Box';
import Navbar from './Navbar';
import { useParams } from "react-router-dom";
import PaletteFooter from './PaletteFooter'
import { withStyles } from '@material-ui/styles'

const styles = {
    Palette: {
        height: "100vh"
    },
    Boxes: {
        height: "89%"
    }
    
}

function Palette(props)
{
    const [level, setLevel] = useState(500);
    const [format, setFormat] = useState("hex");

    let palettes = props.palettes;
    const findPalette = (id) =>
    {
        return palettes.map((p) => 
        {
            if (p.id === id)
            {
                return p;
            }
        })
    }
    const changeLevel = (level) =>
    {
        setLevel(level)
    }
    const changeFormat = (value) =>
    {
        setFormat(value)
    }
    let generatePalette = props.generatePalette;
    let params = useParams();
    let index;
    palettes.forEach(p =>
    {
        if (p.id === params.id)
        {
            index = palettes.indexOf(p);
        }
    });
    if (findPalette(params.id)[index] === undefined)
    {
        return (<div>Palette Not Found</div>)
    }
    else
    {
        const palette = generatePalette(findPalette(params.id)[index]);
        const { colors, paletteName, emoji, id } = palette;
        const { classes } = props;
        const Boxes = colors[level].map(b => (
            <Box background={b[format]}
                name={b.name}
                key={b.id}
                id={b.id}
                moreUrl={`/palette/${id}/${b.id}`}
                showLink={true}
                showingFullPalette={true} 
            />
        ))

        return (
            <div className={classes.Palette}>
                < Navbar level={level} changeLevel={changeLevel} changeFormat={changeFormat} hideSlider={false} />
                <div className={classes.Boxes}>
                    {Boxes}
                </div>
                <PaletteFooter emoji={emoji} paletteName={paletteName} />
            </div >
        )
    }

}


export default withStyles(styles)(Palette);