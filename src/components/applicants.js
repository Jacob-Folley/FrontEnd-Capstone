import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getApplied } from "./fetches/applied"
import { getJobPostings } from "./fetches/jobpostings"

export const EmployerApplicants = () => {
    const user = parseInt(localStorage.getItem("userId"))
    // Use States
    //-------------------------------------------------------------------------------------------------------------------

    const [applicants, setApplicants ] = useState([])
    const [jobpostings, setJobPostings] = useState([])
    const [myposts, setMyPosts ] = useState([])
    const [applied, setApplied] = useState([])

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

    useEffect(
        () => {
            setMyPosts(jobpostings.filter((post) => {
                return post.employer?.id == user
            }))
        },
        []
    )

    useEffect(
        () => {
            getJobPostings()
                .then((data) => {
                    setJobPostings(data)
                })
        },
        []
    )

    useEffect(
        () => {
            setApplied(myposts.map((post) => {
                const applicantsFiltered = applicants.filter((applicant) => {
                    return applicant.posting == post.id
                })
                return applicantsFiltered
            }))
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
                applied.map((applicant) => { 
                   return [ <h3>{applicant.posting}</h3>,
                    <p>{applicant.applicant}</p> ]
                })
            }
        </>

    )
}