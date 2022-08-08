import React, { Component } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Button } from '@mui/material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useParams, useNavigate } from "react-router-dom";
import DraggableColorList from "./DraggableColorList"
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import { withStyles } from '@material-ui/styles';
import { v4 as uuidv4 } from 'uuid';
import randomColor from 'randomcolor'
import useWindowSize from "./useWindowSize"

const drawerWidth = 300;

const styles = {
    content: {
        display: "flex",
        flexWrap: "wrap",
        gap: "40px",
        justifyContent: "center",
        textAlign: "center",
        height: "40%",
        marginTop: "180px"
    },
    btn: {
        width: "50%"
    },
    box: {

    }
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        height: "calc(100vh - 64px)",
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


function NewPaletteForm(props)
{
    const [open, setOpen] = React.useState(false);
    const [Swipeable] = useWindowSize(849, 0)
    const [currentColor, setCurrentColor] = React.useState("teal");
    const [colors, setColors] = React.useState(props.palettes[0] ? props.palettes[0].colors : [])
    const [newColorName, setNewColorName] = React.useState("")
    const [newPaletteName, setNewPaletteName] = React.useState("")


    let navigate = useNavigate();

    const handleDrawerOpen = () =>
    {
        setOpen(true);
    };

    const handleDrawerClose = () =>
    {
        setOpen(false);
    };

    const updateColor = (newColor) =>
    {
        setCurrentColor(newColor.hex);
    }

    const addNewColor = () =>
    {
        const newColor = { color: currentColor, name: newColorName }
        setColors([...colors, newColor])
    }
    const handleColorChage = (e) =>
    {
        setNewColorName(e.target.value);
    }
    const handleChagePalette = (e) =>
    {
        setNewPaletteName(e.target.value);
    }
    const savePalette = (newPaletteName, emoji) =>
    {

        const newPalette = {
            paletteName: newPaletteName,
            id: newPaletteName.toLowerCase().replace(/ /g, "-"),
            emoji: emoji,
            colors: colors
        }
        props.savePalette(newPalette);
        navigate('/')
    }

    const deleteColor = (colorName) =>
    {
        setColors(colors.filter(color => color.name !== colorName))
    }

    const onSortEnd = ({ oldIndex, newIndex }) =>
    {
        setColors(arrayMove(colors, oldIndex, newIndex))
    }

    const clearColors = () =>
    {
        setColors([]);
    }

    const addRandColor = () =>
    {
        // const allColors = props.palettes ? props.palettes.map(p => p.colors).flat() : []
        // const color = allColors[Math.floor(Math.random() * allColors.length)];
        // if(color) color.key = color.name
        // console.log(color)
        setColors([...colors].concat({ key: uuidv4(), name: uuidv4().substring(0, 5), color: randomColor() }))
    }

    ValidatorForm.addValidationRule('isColorNameUnique', (value) => 
    {
        let notValid = false;
        for (let c of colors) 
        {
            if (value.toLowerCase() === c.name.toLowerCase())
            {
                notValid = true;
            }
        }
        if (colors.length > 0 && notValid)
        {
            return false
        }
        else
        {
            return true;
        }
    })
    ValidatorForm.addValidationRule('isColorColorUnique', (value) => 
    {
        let notValid = false;
        for (let c of colors) 
        {
            if (currentColor.toLowerCase() === c.color.toLowerCase())
            {
                notValid = true;
            }
        }
        if (colors.length > 0 && notValid)
        {
            return false
        }
        else
        {
            return true;
        }
    })
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => 
    {
        const palettes = props.palettes;
        let notValid = false;
        for (let p of palettes) 
        {
            if (p.paletteName.toLowerCase() === value.toLowerCase())
            {
                notValid = true;
            }
        }
        if (palettes.length > 0 && notValid) 
        {
            return false
        }
        else
        {
            return true;
        }
    })

    const DrawerContent = () => <>
        <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
        </DrawerHeader>



        <div className={props.classes.content}>
            <div>
                <Typography variant="h4">
                    Design Palette
                </Typography>
                <div>
                    <Button className={props.classes.btn} onClick={clearColors} variant="contained" color='secondary'>Clear</Button>
                    <Button className={props.classes.btn} onClick={addRandColor} disabled={colors.length >= props.maxColors} variant="contained" color='primary'>Random</Button>
                </div>
            </div>




            <ColorPickerForm
                maxColors={props.maxColors}
                currentColor={currentColor}
                updateColor={updateColor}
                addNewColor={addNewColor}
                newColorName={newColorName}
                handleColorChage={handleColorChage}
                colors={colors}
            />
        </div>

    </>

    return (
        <Box sx={{ display: 'flex' }}>
            <PaletteFormNav
                open={Swipeable ? false : open}
                drawerWidth={drawerWidth}
                handleDrawerOpen={handleDrawerOpen}
                handleChagePalette={handleChagePalette}
                newPaletteName={newPaletteName}
                savePalette={savePalette}
            />
            {Swipeable
                ? (<SwipeableDrawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    anchor="left"
                    open={open}
                    onOpen={handleDrawerOpen}
                    onClose={handleDrawerClose}
                >
                    <DrawerContent />
                </SwipeableDrawer>)
                : (<Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerContent />
                </Drawer>)
            }


            <Main
                open={Swipeable ? true : open}
            >
                <DrawerHeader />
                {
                    <DraggableColorList
                        onSortEnd={onSortEnd}
                        axis="xy"
                        colors={colors}
                        deleteColor={deleteColor} />
                }
            </Main>
        </Box>
    )
}
NewPaletteForm.defaultProps = {
    maxColors: 20
}

export default withStyles(styles)(NewPaletteForm);
