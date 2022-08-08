import React from 'react'
import { SortableElement } from 'react-sortable-hoc'
import { withStyles } from '@material-ui/styles'
import DeleteIcon from "@material-ui/icons/Delete"


const styles = {
    root: {
        width: "20%",
        height: "25.3%",
        display: "inline-block",
        cursor: "pointer",
        position: "relative",
        marginBottom: "-7px",
        "&:hover svg": {
            color: "white",
            transform: "scale(1.3)"
        },
        '@media (max-width: 849px)': {
            width: "20%",
            height: "25%",
        },
        '@media (max-width: 466px)': {
            width: "25%",
            height: "20.2%",
        },
        '@media (max-width: 380px)': {
            width: "50%",
            height: "10.2%",
        }
    },
    boxContent: {
        position: "absolute",
        width: "100%",
        left: "0px",
        bottom: "0px",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between"
    },
    delIcon: {
        color: "black",
        display: "inline",
        transition: "all 0.2s"
    }
}

const DraggableCBox = SortableElement((props) =>
{
    const { classes, deleteColor, name, color } = props
    return (
        <div
            className={classes.root}
            style={{
                backgroundColor: color
            }}
        >
            <section className={classes.boxContent}>
                <div style={{ display: "inline" }}>{name}</div>
                <DeleteIcon className={classes.delIcon} onClick={() => { deleteColor(name) }}></DeleteIcon>
            </section>

        </div>
    )
})

export default withStyles(styles)(DraggableCBox)
