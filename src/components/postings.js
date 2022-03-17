import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getJobPostings } from "./fetches/jobpostings"

export const EmployerPostings = () => {
    const user = parseInt(localStorage.getItem("lu_token"))

    // Use States
    //-------------------------------------------------------------------------------------------------------------------

    const [postings, setPostings] = useState([])

    // Use Effects
    //-------------------------------------------------------------------------------------------------------------------

    useEffect(
        () => {
            getJobPostings()
                .then((data) => {
                    setPostings(data)
                })
        },
        []
    )


    // Functions/Objects
    //-------------------------------------------------------------------------------------------------------------------
    


    //-------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <h1>Employer Postings</h1>
            {
                postings.map((post) => { 
                   return [ <h3>{post.title}</h3>,
                    <p>{post.description}</p>,
                    <h3>{post.skills}</h3> ]
                })
            }

        </>

    )
}