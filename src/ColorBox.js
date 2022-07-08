import React from 'react'
import { useParams } from "react-router-dom";
import Box from './Box';
import Navbar from './Navbar';
import { useState } from 'react';
import PaletteFooter from './PaletteFooter'
import { withStyles } from '@material-ui/styles';


const styles = {
    Palette: {
        height: "100vh"
    },
    goBack: {
        height: "50%",
        backgroundColor: "black"
    },
    Box: {
        width: "20%",
        height: props => (props.showingFullPalette ? "25%" : "50%"),
        display: "inline-block",
        cursor: "pointer",
        position: "relative",
        marginBottom: "-4px",
        "&:hover button":
        {
            opacity: "0.7"
        }
    },
    BtnCopy: {
        width: "60px",
        height: "13%",
        left: "40%",
        right: "40%",
        top: "45%",
        position: "absolute",
        textAlign: "center",
        outline: "none",
        border: "none",
        backgroundColor: "rgba(255, 255, 255, 0.26)",
        fontSize: "1rem",
        lineHeight: "20px",
        borderRadius: "5px",
        color: "white",
        opacity: "0",
        "&:hover":
        {
            backgroundColor: "rgba(255, 255, 255, 0.822)",
            color: "black"
        }
    },
    copy: {
        textDecoration: "none",
        opacity: "0.7",
        lineHeight: "25px",
        height: "6.5%"
    },
    Boxes: {
        height: "89%"
    }
    
}


function ColorBox(props)
{
    let params = useParams();
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
    function getPalette(id)
    {
        let generatePalette = props.generatePalette;
        let index;
        palettes.forEach(p =>
        {
            if (p.id === id)
            {
                index = palettes.indexOf(p);
            }
        });
        return generatePalette(findPalette(params.id)[index]);
    }
    function gatherShades(id, color)
    {

        let shades = [];
        let palette = getPalette(id);
        console.log(palette)
        let allColors = palette.colors;

        for (let key in allColors)
        {
            shades = shades.concat(allColors[key].filter(c => c.id === color))
        }
        return shades.slice(1);
    }
    const changeFormat = (value) =>
    {
        setFormat(value)
    }
    let palette = getPalette(params.id)
    let _shades = gatherShades(params.id, params.color)
    const { classes } = props;
    const colorBoxes = _shades.map(c => (<Box showingFullPalette={false} key={c.id} name={c.name} background={c[format]} showLink={false} />))
    return (
        <div className={classes.Palette}>
            <Navbar changeFormat={changeFormat} hideSlider={true} />
            <div className={`${classes.Boxes}`}>
                {colorBoxes}
                <div className={`${classes.goBack} ${classes.Box}`}><a className={`${classes.BtnCopy} ${classes.copy}`} href={`/palette/${params.id}`}>Back</a></div>
            </div>

            <PaletteFooter emoji={palette.emoji} paletteName={palette.paletteName} />
        </div>
    )
}
export default withStyles(styles)(ColorBox);