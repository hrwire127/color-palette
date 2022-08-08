import React, { useState } from 'react'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import "./Navbar.css";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import { withStyles } from '@material-ui/styles';
import useWindowSize from "./useWindowSize"
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

const styles =
{
    Slider: {
        width: "340px",
        margin: "0 10px",
        display: "inline-block",
        '@media (max-width: 670px)': {
            width: "140px",
        },
        '@media (max-width: 500px)': {
            width: "72%"
        },
    },
    Navbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "6vh"
    },
    Logo: {
        marginRight: "15px",
        padding: "0 13px",
        fontSize: "22px",
        backgroundColor: "#eceff1",
        height: "100%",
        display: "flex",
        alignItems: "center"
    },
    link: {
        textDecoration: "none",
        color: "black"
    },
    Select: {
        border: "none !important"
    },
    SliderContainer: {
        display: "flex",
        justifyContent: "center"
    }
}

function Navbar(props)
{
    const { level, changeLevel, changeFormat, hideSlider, classes } = props;

    const [format, setFormat] = useState("hex")
    const [formatChange, setFormatChange] = useState(false)
    const [Small] = useWindowSize(500, 0)

    async function handleChange(e)
    {
        setFormat(e.target.value)
        setFormatChange(true)
        await setTimeout(() =>
        {
            setFormatChange(false)
        }, 1500);

        changeFormat(e.target.value)
    }

    return (<>

        <nav className={classes.Navbar}>
            <div className={classes.Logo}>
                <a href='/' className={classes.link}>ColorPalette</a>
            </div>
            {!hideSlider && !Small && <div>
                <span>Level: {level}</span>
                <div className={classes.Slider}>
                    <Slider
                        defaultValue={level}
                        min={100} max={900}
                        step={100}
                        onAfterChange={changeLevel}
                        animation={true}
                    />
                </div>
            </div>
            }
            <div>
                <FormControl fullWidth>
                    <NativeSelect
                        value={format} onChange={handleChange}
                    >
                        <option value={"hex"}>HEX</option>
                        <option value={"rgb"}>RGB</option>
                        <option value={"rgba"}>RGBA</option>
                    </NativeSelect>
                </FormControl>
            </div>
            <Snackbar open={formatChange} autoHideDuration={6000} >
                <Alert severity="info" sx={{ width: '100%', border: "1px solid black" }}>
                    Successfully Modified
                </Alert>
            </Snackbar>
        </nav>
        {Small && (
            <div className={classes.SliderContainer}>
                <div>Level: {level}</div>
                <div className={classes.Slider}>
                    <Slider
                        defaultValue={level}
                        min={100} max={900}
                        step={100}
                        onAfterChange={changeLevel}
                        animation={true}
                    />
                </div>
            </div>)}
    </>
    )
}

export default withStyles(styles)(Navbar)
