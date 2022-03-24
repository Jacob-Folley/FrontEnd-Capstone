import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { createCompany, getCompany, getCompanies } from "../fetches/company"
import "animate.css"

export const EmployerProfile = () => {
    const history = useHistory()
    const user = parseInt(localStorage.getItem("userId"))
    // Use States
    //-------------------------------------------------------------------------------------------------------------------

    const [profile, setProfile] = useState({
        companyName: "",
        description: ""
    })
    // const [created, setCreated] = useState(false)
    const [companies, setCompanies] = useState([])
    const [companyProfile, setCompanyProfile] = useState({})
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
            if (companies.length > 0) {
                setCompanyProfile(companies.find((comp) => {
                    return comp.employer.id == user
                }))
            }
        },
        [companies]
    )

    useEffect(
        () => {
            if (companyProfile?.id) {
                getCompany(companyProfile.id)
                    .then((data) => {
                        setCompany(data)
                    })
            }
        },
        [companyProfile]
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

                company.id ?
                    (
                        <div className="ProfileContainer animate__animated animate__zoomIn">
                            <h1 className="ProfileTitle animate__animated animate__pulse">{company.name}</h1>
                            <button type="submit"
                                onClick={evt => {
                                    // Prevent form from being submitted
                                    evt.preventDefault()
                                    history.push(`/profileEdit/${company.id}`)
                                }}
                                className="PostingsButton">edit</button>
                            <p className="ProfileDescription">{company.description}</p></div>
                    )
                    :
                    <section className="ProfileFormContainer animate__animated animate__zoomIn">
                        <form className="ProfileForm">
                            <label className="ProfileLabel" htmlFor="companyName">Company Name</label>
                            <input type="text" id="companyName" name="companyName" value={profile.companyName} onChange={changeFormState} />
                            <label id="ProfileDescriptionLabel" className="ProfileLabel" htmlFor="description">Company Description:</label>
                            <textarea id="description" name="description" value={profile.description} onChange={changeFormState} />

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