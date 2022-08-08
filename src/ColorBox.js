import React from 'react'
import { useParams } from "react-router-dom";
import Box from './Box';
import Navbar from './Navbar';
import { Link } from "react-router-dom";
import { useState } from 'react';
import PaletteFooter from './PaletteFooter'
import { withStyles } from '@material-ui/styles';


const styles = {
    Palette: {
        height: "100vh"
    },
    goBack: {
        width: "20%",
        height: "50%",
        backgroundColor: "black",
        '@media (max-width: 620px)': {
            width: "50% !important",
            height: "20% !important",
        },
    },
    Box: {
        display: "inline-block",
        cursor: "pointer",
        position: "relative",
        marginBottom: "-4px",
        "&:hover button":
        {
            opacity: "0.7"
        },
    },
    BtnCopy: {
        width: "60px",
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
        },
        padding:4
    },
    copy: {
        textDecoration: "none",
        opacity: "0.7",
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
    const colorBoxes = _shades.map(c => (<Box showingFullPalette={false} key={c.id} name={c.name} background={c[format]} showLink={false} isColor/>))
    return (
        <div className={classes.Palette}>
            <Navbar changeFormat={changeFormat} hideSlider={true} />
            <div className={`${classes.Boxes}`}>
                {colorBoxes}
                <div className={`${classes.goBack} ${classes.Box}`}><Link className={`${classes.BtnCopy} ${classes.copy}`} to={`/palette/${params.id}`}>Back</Link></div>
            </div>

            <PaletteFooter emoji={palette.emoji} paletteName={palette.paletteName} />
        </div>
    )
}
export default withStyles(styles)(ColorBox);