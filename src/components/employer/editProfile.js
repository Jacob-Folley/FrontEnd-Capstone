import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { createCompany, getCompany, getCompanies } from "../fetches/company"
import "animate.css"

export const EditEmployerProfile = () => {
    const history = useHistory()
    const user = parseInt(localStorage.getItem("userId"))
    const { companyId } = useParams()
    // Use States
    //-------------------------------------------------------------------------------------------------------------------

    const [profile, setProfile] = useState({
        companyName: "",
        description: ""
    })
    // const [created, setCreated] = useState(false)
    const [companies, setCompanies] = useState([])
    const [company, setCompany] = useState({})

    // Use Effects
    //-------------------------------------------------------------------------------------------------------------------

    //FIND COMPANY THAT MATCHES EMPLOYER; IF FOUND DISPLAY DATA : ELSE DISPLAY FORM

    useEffect(
        () => {
            getCompanies()
                .then((data) => {
                    setCompanies(data)
                })
        },
        []
    )

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

    const changeFormState = (domEvent) => {
        const copy = { ...profile }
        copy[domEvent.target.name] = domEvent.target.value

        setProfile(copy)
    }


    //-------------------------------------------------------------------------------------------------------------------

    return (
        <>
            {
                <section className="ProfileFormContainer animate__animated animate__zoomIn">
                    <form className="ProfileForm">
                        <label className="ProfileLabel" htmlFor="companyName">Company Name</label>
                        <input type="text" id="companyName" name="companyName" value={company.name} onChange={changeFormState} />
                        <label id="ProfileDescriptionLabel" className="ProfileLabel" htmlFor="description">Company Description:</label>
                        <textarea id="description" name="description" value={company.description} onChange={changeFormState} />

                        <button type="submit"
                            onClick={evt => {
                                // Prevent form from being submitted
                                evt.preventDefault()

                                const company = {
                                    name: profile.companyName,
                                    description: profile.description
                                }

                                // Send POST request to your API
                                createCompany(company)
                                    .then(() => history.push("/"))
                            }}
                            className="btn btn-primary">Create</button>
                    </form>
                </section>
            }
        </>

    )
}