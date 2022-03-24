import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { createCompany, getCompany, getCompanies } from "../fetches/company"
import "animate.css"

export const ApplicantEmployerProfile = () => {
    const history = useHistory()
    const { companyId } = useParams()
    const user = parseInt(localStorage.getItem("userId"))
    // Use States
    //-------------------------------------------------------------------------------------------------------------------
    const [company, setCompany] = useState({})

    // Use Effects
    //-------------------------------------------------------------------------------------------------------------------

    useEffect(
        () => {
            
                getCompany(companyId)
                    .then((data) => {
                        setCompany(data)
                    })
            }
        ,
        []
    )


    // Functions/Objects
    //-------------------------------------------------------------------------------------------------------------------

  


    //-------------------------------------------------------------------------------------------------------------------

    return (
        <>
                        <div className="ProfileContainer animate__animated animate__zoomIn">
                            <h1 className="ProfileTitle animate__animated animate__pulse">{company.name}</h1>
                            <p className="ProfileDescription">{company.description}</p>
                        </div>
                    
            
        </>

    )
}