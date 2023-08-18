import { useState } from "react"

function Note(){
    const [isEdit, setIsEdit] = useState(false);

    return (
        <>
        <p>Note content goes here!</p>
        </>
    )
}