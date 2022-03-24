import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { getApplied } from "../fetches/applied"
import "animate.css"

export const ApplicantApplied = () => {
    const user = parseInt(localStorage.getItem("userId"))
    const history = useHistory()
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
            setMyApplied(applied.filter((app) => {
                return app.applicant.id == user
            }))
        },
        [applied]
    )


    // Functions/Objects
    //-------------------------------------------------------------------------------------------------------------------



    //-------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <div className="mainContainer">
                {
                    myApplied.map((applied) => {
                        return (
                            <>
                                <div className="ApplicantAppliedContainer animate__animated animate__zoomIn">
                                    <h3 className="hyperLink" onClick={() => {history.push(`/post/${applied.id}`)}}>{applied.posting.title}</h3>
                                    {/* <p>{applied.posting.description}</p> */}
                                    <p>{applied.posting?.employer?.username}</p>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </>

    )
}