import { withStyles } from '@material-ui/styles'
import React, { Component } from 'react'
const styles = {
    PaletteFooter:
    {
        height: "5vh",
        backgroundColor: "rgb(240, 240, 240)",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "10px",
        fontWeight: "bold"
    },
    Emoji:
    {
        fontWeight: "normal",
        fontSize: "1rem"
    }
}
class PaletteFooter extends Component
{
    render()
    {
        const { classes } = this.props;
        return (
            <footer className={classes.PaletteFooter}>
                {this.props.paletteName}
                <div className={classes.Emoji}>
                    {this.props.emoji}
                </div>
            </footer>
        )
    }
}

export default withStyles(styles)(PaletteFooter)
