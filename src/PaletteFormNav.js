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
import useWindowSize from "./useWindowSize"
import { useParams, useNavigate } from "react-router-dom";
import DraggableColorList from "./DraggableColorList"
import { arrayMove } from 'react-sortable-hoc';
import { withStyles } from '@material-ui/styles';
import PaletteMetaForm from './PaletteMetaForm';

const styles = {
    buttons: {
        display: "flex",
        flexStart: "flex-end",
        '& a': {
            textDecoration: "none"
        }
    },
    bar: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between"
    }
}

function PaletteFormNav(props)
{
    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));
    
    const [SmallBtns] = useWindowSize(400, 0)
    const { classes, open, drawerWidth, handleDrawerOpen, savePalette, newPaletteName, handleChagePalette } = props;

    return (
        <div>
            <CssBaseline />
            <AppBar color="default" position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className={classes.bar}>

                        <div>
                            <Typography variant="h6" noWrap component="div">
                                New Palette
                            </Typography>
                        </div>

                        <div className={classes.buttons}>

                            <PaletteMetaForm handleChagePalette={handleChagePalette} newPaletteName={newPaletteName} savePalette={savePalette} />

                            <Link to='/' ><Button variant="contained" color="secondary" size={SmallBtns ? "small" : "medium"}>Back</Button></Link>
                        </div>
                    </div>

                </Toolbar>

            </AppBar>
        </div>
    )
}

export default withStyles(styles)(PaletteFormNav)