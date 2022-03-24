import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { getAccepted } from "../fetches/accepted"
import "animate.css"

export const ApplicantAccepted = () => {
    const user = parseInt(localStorage.getItem("userId"))
    const history = useHistory()
    // Use States
    //-------------------------------------------------------------------------------------------------------------------

    const [accepted, setAccepted] = useState([])

    // Use Effects
    //-------------------------------------------------------------------------------------------------------------------

    useEffect(
        () => {
            getAccepted()
                .then((data) => {
                    setAccepted(data)
                })
        },
        []
    )


    // Functions/Objects
    //-------------------------------------------------------------------------------------------------------------------



    //-------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <div className="AcceptedMainContainer">
            {
                accepted.map((obj) => {
                    if (obj.applicant.id == user) {
                        return (
                            <>
                                <div className="ApplicantAcceptedContainer animate__animated animate__zoomIn">
                                    <h3 className="hyperLink" onClick={() => {history.push(`/post/${obj.id}`)}}>{obj.posting.title}</h3>
                                    <p id="employerName">{obj.posting.employer?.first_name + " " + obj.posting.employer?.last_name}</p>
                                    {/* <p>{obj.posting.description}</p> */}
                                </div>
                            </>
    )
}
                })
            }
            </div>
        </>

    )
}