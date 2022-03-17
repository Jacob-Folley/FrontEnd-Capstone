import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getApplied } from "./fetches/applied"

export const EmployerApplicants = () => {

    // Use States
    //-------------------------------------------------------------------------------------------------------------------

    const [applicants, setApplicants ] = useState([])

    // Use Effects
    //-------------------------------------------------------------------------------------------------------------------

    useEffect(
        () => {
            getApplied()
                .then((data) => {
                    setApplicants(data)
                })
        },
        []
    )


    // Functions/Objects
    //-------------------------------------------------------------------------------------------------------------------
    


    //-------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <h1>Employer Applicants</h1>

            {
                applicants.map((applicant) => { 
                   return [ <h3>{applicant.posting}</h3>,
                    <p>{applicant.applicant}</p> ]
                })
            }
        </>

    )
}