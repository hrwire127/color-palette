import React, { Component } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from "emoji-mart"
import useWindowSize from "./useWindowSize"
import 'emoji-mart/css/emoji-mart.css'

function PaletteMetaForm(props)
{
    const [formState, setFormState] = React.useState("");
    const [SmallBtns] = useWindowSize(400, 0)
    const [newPaletteName, setNewPaletteName] = React.useState("")


    const handleClickOpen = () =>
    {
        setFormState("name")
    };

    const handleClose = () =>
    {
        setFormState("")
    };

    const handleChageName = (e) =>
    {
        setNewPaletteName(e.target.value);
    }

    const handleChagePalette = (e) =>
    {
        setFormState("emoji");
    }
    const { savePalette } = props;

    const finishPalette = (newEmoji) =>
    {
        savePalette(newPaletteName, newEmoji.native)
    }

    return (
        <div>
            <Button onClick={handleClickOpen} type='submit' variant="contained" color='primary' size={SmallBtns ? "small" : "medium"}>Save</Button>
            <Dialog open={formState === "emoji"}>
                <Picker onSelect={finishPalette} />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={formState === "name"} onClose={handleClose}>
                <DialogTitle>Palette Name</DialogTitle>
                <DialogContent>
                    <ValidatorForm style={{ marginTop: "5px" }} onSubmit={handleChagePalette} >

                        <TextValidator
                            label="Palette Name"
                            name={newPaletteName}
                            onChange={handleChageName}
                            value={newPaletteName}
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["Palette Name required", "Name Already Used"]}
                        />

                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type='submit' variant="contained" color='primary'>Save</Button>
                        </DialogActions>
                    </ValidatorForm>
                </DialogContent>


            </Dialog>
        </div>
    );
}

export default PaletteMetaForm
