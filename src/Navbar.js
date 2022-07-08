import React, { Component } from 'react'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import "./Navbar.css";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import { withStyles } from '@material-ui/styles';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

const styles =
{
    
    Slider: {
        width: "340px",
        margin: "0 10px",
        display: "inline-block"
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
    }
}

class Navbar extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            format: "hex",
            formatChange: false
        }
        this.handleChange = this.handleChange.bind(this);
    }
    async handleChange(e)
    {
        this.setState({ format: e.target.value, formatChange: true })
        await setTimeout(() =>
        {
            this.setState({ formatChange: false })
        }, 1500);

        this.props.changeFormat(e.target.value)
    }
    render()
    {
        const { level, changeLevel, changeFormat, hideSlider, classes } = this.props;
        const { format, formatChange } = this.state;
        return (
            <nav className={classes.Navbar}>
                <div className={classes.Logo}>
                    <a href='/' className={classes.link}>ColorPalette</a>
                </div>
                {hideSlider ? <div></div>
                    :
                    <div>
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
                    {/* <Select className="Select" value={format} onChange={this.handleChange}>
                        <MenuItem value="hex">HEX - #fffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgb(255,255,255, 1.0)</MenuItem>
                    </Select> */}
                    <FormControl fullWidth>
                        <NativeSelect
                            value={format} onChange={this.handleChange}
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
        )
    }
}

export default withStyles(styles)(Navbar)
