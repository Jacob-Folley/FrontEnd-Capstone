import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getApplied } from "../fetches/applied"

export const ApplicantApplied = () => {
    const user = parseInt(localStorage.getItem("userId"))

    // Use States
    //-------------------------------------------------------------------------------------------------------------------

    const [applied, setApplied] = useState([])
    const [myApplied, setMyApplied] = useState([])

    // Use Effects
    //-------------------------------------------------------------------------------------------------------------------

    useEffect(
        () => {
            getApplied()
                .then((data) => {
                    setApplied(data)
                })
        },
        []
    )

    useEffect(
        () => {
            setMyApplied(applied.filter((obj) => {
                return obj.applicant == user
            }))
        },
        []
    )


    // Functions/Objects
    //-------------------------------------------------------------------------------------------------------------------



    //-------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <h1>Applicant Applied</h1>
            {
                myApplied.map((applied) => {
                    return (
                        <>
                            <h2>{applied.posting}</h2>
                        </>
                    )
                })
            }
        </>

    )
}