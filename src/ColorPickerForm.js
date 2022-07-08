import React, { Component } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Button } from '@mui/material';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useParams, useNavigate } from "react-router-dom";
import DraggableColorList from "./DraggableColorList"
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';

import { withStyles } from '@material-ui/styles';


const styles = {
    picker: {
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center"
    },
    container: {
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        justifyContent: "center"
    },
    btn: {
        width: "40%",
        height: "50px"
    }
}

class ColorPickerForm extends Component
{
    render()
    {
        const { classes, maxColors, currentColor, updateColor, addNewColor, newColorName, handleColorChage, colors } = this.props;
        return (
            <div className={classes.picker}>
                <ChromePicker color={currentColor} onChange={updateColor} />
                <ValidatorForm className={classes.container} onSubmit={addNewColor} onError={errors => console.log(errors)}>
                    <TextValidator
                        value={newColorName}
                        name="newName"
                        onChange={handleColorChage}
                        validators={["required", "isColorNameUnique", "isColorColorUnique"]}
                        errorMessages={["this field is required", "name already used", "color already used"]}
                    />
                    <Button className={classes.btn} type='submit' variant="contained" disabled={colors.length >= maxColors} color='primary' style={{ backgroundColor: currentColor }}>Add Color</Button>
                </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles)(ColorPickerForm)
