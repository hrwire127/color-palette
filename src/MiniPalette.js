import React from 'react';
import { withStyles } from "@material-ui/styles";
import { Delete } from '@material-ui/icons'
import { Link } from "react-router-dom"

const styles = {
    root: {
        backgroundColor: "white",
        boxShadow: "0px 0px 10px -2px black",
        borderRadius: "5px",
        position: "relaive",
        overflow: "hidden",
        "&:hover": {
            cursor: "pointer"
        }
    },
    colors: {
        backgroundColor: "grey",
        height: "150px",
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
    },
    miniColor: {
        height: "25%",
        width: "20%",
        display: "inline-block",
        position: "relative",
        marginBottom: "-3.5px"
    },
    title: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "4px",
        color: "black",
        paddingTop: "0.5rem",
        fontSize: "1rem",
        position: "relative",
    },
    emoji: {
        marginLeft: "0.05rem",
        fontSize: "1.5rem"
    },
    delete: {
        color: "black",
        transition: "transform 0.2s, color 0.2s",
        "&:hover": {
            transform: "scale(1.3)",
            color: "red"
        }
    },
    desc: {
        marginBottom: "5px"
    }
}

function MiniPalette(props)
{
    const { classes, paletteName, name, emoji, colors, deletePalette, id } = props;
    const miniColorBoxes = colors.map(color => (
        <div
            className={classes.miniColor}
            style={{ backgroundColor: color.color }}
            key={color.name}
        ></div>
    ))
    return (
        <div className={classes.root}>
            <Link to={`/palette/${id}`} key={id} style={{ textDecoration: "none" }}>
                <div className={classes.colors}>
                    {miniColorBoxes}
                </div>
            </Link>


            <h5 className={classes.title}>
                <Link to={`/palette/${id}`} key={id} style={{ textDecoration: "none" }}>
                    <div className={classes.desc}> {paletteName}<span className={classes.emoji}>{emoji}</span></div>
                </Link>
                <Link to={`/`}> <span className={classes.delete}> <Delete onClick={() => { deletePalette(id) }} /></span></Link>
            </h5>
        </div>
    )
}
export default withStyles(styles)(MiniPalette);