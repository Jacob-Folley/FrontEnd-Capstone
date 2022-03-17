import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { createCompany, getCompany } from "./fetches/company"

export const EmployerProfile = () => {
    const history = useHistory()
    // Use States
    //-------------------------------------------------------------------------------------------------------------------

    const [profile, setProfile] = useState({
        companyName: "",
        description: ""
    })
    const [company, setCompany] = useState({})
    const [created, setCreated] = useState(false)

    // Use Effects
    //-------------------------------------------------------------------------------------------------------------------

    useEffect(
        () => {
            getCompany(1) //FIX: GET CURRENT USER ID
                .then((data) => {
                    setCompany(data)
                    if (company) {
                        setCreated(true)
                    }
                })
        },
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
            <h1>Employer Profile</h1>
            {console.log(created)}
            {
                created ? 
                [<h1>{company.name}</h1>, <p>{company.description}</p>]
                : 
                <section className="ProfileForm">
                <form>
                    <label htmlFor="companyName">Company Name</label>
                    <input type="text" id="companyName" name="companyName" value={profile.companyName} onChange={changeFormState} />
                    <label htmlFor="description">Company Description:</label>
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
                                .then(() => history.push("/profile"))
                        }}
                        className="btn btn-primary">Create</button>
                </form>
            </section>
            }
        </>

    )
}