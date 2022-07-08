import React, { Component } from 'react'
import { Link } from "react-router-dom"
import MiniPalette from "./MiniPalette"
import { withStyles } from "@material-ui/styles";
import { Add } from '@material-ui/icons';

const styles = {
    root: {
        background: "url('/palette-bg.jpeg')",
        backgroundSize: "cover",
        // backgroundColor: "white",
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    container: {
        width: "70%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap"
    },
    Nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        color: "black",
        paddingBottom: 30,
        "& a": {
            textDecoration: "none",
            color: "black"
        },
    },
    palettes: {
        // boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, 220px)",
        justifyContent: "left",
        gap: 40,
    },
    text: {
        color: "white",
        fontWeight: 200
    },
    createpalette:
    {
        fontWeight: 500,
        fontFamily: "'Lato', sans-serif",
        fontFamily: "'Montserrat', sans-serif",
        fontFamily: "'Noto Sans', sans-serif",
        fontFamily: "'Nunito', sans-serif",
        fontFamily: "'Edu SA Beginner', cursive",
    },
    "@keyframes example": {
        "0%": {
            marginTop: "0px",
            transform: "rotate(40deg) scaleX(-1)"
        },
        "50%": {
            marginTop: "10px",
            transform: "rotate(45deg) scaleX(-1)"
        },
        "100%": {
            marginTop: "0px",
            transform: "rotate(40deg) scaleX(-1)"
        }
    },
    img: {
        position: "absolute",
        width: 60,
        animationName: "$example",
        animationDuration: "0.8s",
        animationIterationCount: "infinite"
    }
}


class PaletteList extends Component
{
    render()
    {
        const { palettes, classes, deletePalette } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.Nav}>
                        <h1 className={classes.text}>Color Palettes</h1>
                        <Link to="/palette/new"><Add className={classes.text}>add_circle</Add>
                            {palettes.length <= 0
                                && (<div style={{ position: "absolute" }}>
                                    <img src="/arrow.png" className={classes.img} />
                                    <p className={classes.createpalette} style={{ width: "100%", fontSize: 13, fontFamily: "", marginTop: 80 }}>CREATE A PALETTE</p>
                                </div>)
                            }
                        </Link>
                    </nav>
                    {palettes.length > 0
                        && (<div className={classes.palettes}>
                            {palettes.map(p => (
                                <MiniPalette deletePalette={deletePalette} id={p.id} key={p.paletteName} {...p} />
                            ))}
                        </div>)
                    }
                </div>

            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);
