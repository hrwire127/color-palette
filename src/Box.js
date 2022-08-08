import React, { Component } from 'react'
import { CopyToClipboard } from "react-copy-to-clipboard"
import { Link } from "react-router-dom"
import chroma from 'chroma-js'
import { withStyles } from '@material-ui/styles'

const styles = {
    copyText: {
        color: props => chroma(props.background).luminance() >= 0.07 ? "black" : "white"
    },
    More: {
        color: "white",
        position: "absolute",
        border: "none",
        right: "0px",
        bottom: "0px",
        width: "60px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px"
    },
    BtnCopy: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "60px",
        height: props => (props.showingFullPalette ? "13%" : "6.5%"),
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
    Title: {
        position: "absolute",
        bottom: "0%",
        padding: "6px",
        textTransform: "uppercase",
        fontSize: "12px"
    },
    Content: {
        height: "90%"
    },
    Container: {
        height: "100%"
    },
    Overlay:
    {
        position: 'absolute',
        opacity: '0',
        zIndex: '0',
        width: '100%',
        height: '100%',
        transition: 'opacity 0.1s',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "column"

    },
    Show: {
        opacity: "1",
        zIndex: "10"
    },

    OverlayTitle:
    {
        fontSize: "30px"
    },
    OverlayText:
    {
        fontSize: "20px"
    },
    LightText: {
        color: "white"
    },
    BlackText:
    {
        color: "black"
    },
    smBtnCopy: {
        height: "6.5%"
    },
    isColor: {
        '@media (max-width: 620px)': {
            width: "50% !important",
            height: "20% !important",
        },
    },
    isNotColor: {
        '@media (max-width: 580px)': {
            width: "25% !important",
            height: "20% !important",
        },
        '@media (max-width: 550px)': {
            width: "50% !important",
            height: "10% !important",
        }
    }
}

class Box extends Component
{
    constructor(props)
    {
        super(props)
        this.state =
        {
            copied: false
        }
        this.changCopyState = this.changCopyState.bind(this);
    }
    changCopyState()
    {
        this.setState({ copied: true })
        setTimeout(() => this.setState({ copied: false }), 500)
    }
    render()
    {

        const { name, background, moreUrl, showLink, classes, showingFullPalette, isColor } = this.props;
        const { copied } = this.state;

        const boxStyle = isColor
            ? {
                background,
                width: "20%",
                height: "50%",
            }
            : {
                background,
                width: "20%",
                height: "25%",
            }
        console.log(isColor)

        return (
            <div style={boxStyle} className={`${classes.Box} ${isColor ? classes.isColor : classes.isNotColor}`} >
                <div style={{ background: background }} className={`${classes.Overlay} ${copied && classes.Show}`}>
                    <div className={classes.copyText}>Copied</div>
                    <div className={classes.copyText}>{background}</div>
                </div>
                <div className={classes.Container}>
                    <div className={classes.Content}>
                        <span className={`${classes.copyText} ${classes.Title}`} >
                            {name}
                        </span>
                        <CopyToClipboard text={background} onCopy={this.changCopyState} >
                            <button className={`${classes.copyText} ${classes.BtnCopy}`}>Copy</button>
                        </CopyToClipboard>
                    </div>
                    {showLink &&
                        <Link
                            to={moreUrl}
                            onClick={e => e.stopPropagation()}
                        >
                            <div className={`${classes.copyText} ${classes.More}`}>More</div>
                        </Link>
                    }
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Box)
