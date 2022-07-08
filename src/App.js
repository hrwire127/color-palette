import Palette from './Palette';
import React, { Component } from 'react'
import { generatePalette } from './colorHelpers';
import
{
    Routes,
    Route
} from "react-router-dom";
import PaletteList from './PaletteList';
import ColorBox from './ColorBox';
import NewPaletteForm from './NewPaletteForm';
import "./App.css"

function App()
{
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"))
    let [palettes, setPalette] = React.useState(savedPalettes ? savedPalettes : [])


    const savePalette = (newPalette) =>
    {
        const newPalettes = [...palettes].concat(newPalette)
        setPalette(newPalettes)
        syncLocalStorage(newPalettes);
    }

    const deletePalette = (id) =>
    {
        const newPalettes = palettes.filter(p => p.id !== id)
        setPalette(newPalettes)
        syncLocalStorage(newPalettes);
    }

    const syncLocalStorage = (newPalettes) =>
    {
        window.localStorage.setItem("palettes", JSON.stringify(newPalettes))
    }

    return (
        <div className="App">
            <Routes>
                <Route exact path="/palette/new" element={<NewPaletteForm savePalette={savePalette} palettes={palettes} />} />
                <Route exact path="/" element={<PaletteList palettes={palettes} deletePalette={deletePalette} />} />
                <Route exact path="/palette/:id" element={<Palette palettes={palettes} generatePalette={generatePalette} />} />
                <Route exact path="/palette/:id/:color" element={<ColorBox palettes={palettes} generatePalette={generatePalette} />} />
                <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem", textAlign: "center" }}>
                            <p>There's nothing here!</p>
                        </main>
                    } />
                {/* <Palette palette={generatePalette(seedColors[0])} /> */}
            </Routes>
        </div>
    );
}

export default App;



