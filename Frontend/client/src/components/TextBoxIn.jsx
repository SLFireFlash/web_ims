import React from "react"
export default function TextBoxIn({name,placeholder}){
    return(
        <>
        <input type="text" name={name} placeholder={placeholder} />
        </>
    )
}