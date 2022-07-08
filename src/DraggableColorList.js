import React, { Component } from 'react'
import DraggableCBox from './DraggableCBox'
import { SortableContainer } from 'react-sortable-hoc'


const DraggableColorList = SortableContainer(({ colors, deleteColor }) => 
{
    return (
        <div style={{
            height: "100%",
            width: "100%"
        }}>
            {colors.map((c, i) =>
            {
                return <DraggableCBox color={c.color} index={i} key={c.name} name={c.name} deleteColor={deleteColor} />
            })}
        </div>
    )

})


export default DraggableColorList
