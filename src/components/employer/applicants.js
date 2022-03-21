import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { deleteApplied } from "../fetches/applied"
import { getJobPostings } from "../fetches/jobpostings"
import { createAccepted, getAccepted } from "../fetches/accepted"

export const EmployerApplicants = () => {
    const user = parseInt(localStorage.getItem("userId"))
    // Use States
    //-------------------------------------------------------------------------------------------------------------------
    const [jobpostings, setJobPostings] = useState([])
    const [myposts, setMyPosts] = useState([])
    const [accepted, setAccepted] = useState([])
    const [myAccepted, setMyAccepted] = useState([])
    const history = useHistory()

    // Use Effects
    //-------------------------------------------------------------------------------------------------------------------
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
            if (jobpostings.length > 0) {
                setMyPosts(jobpostings.filter((post) => {
                    return post.employer?.id == user
                }))
            }
        },
        [jobpostings]
    )

    useEffect(
        () => {
            getAccepted()
                .then((data) => {
                    setAccepted(data)
                })
        },
        []
    )

    useEffect(
        () => {
            if (accepted.length > 0) {
                setMyAccepted(accepted.filter((post) => {
                    return post.posting?.employer == user
                }))
            }
        },
        [accepted]
    )


    // Functions/Objects
    //-------------------------------------------------------------------------------------------------------------------


    //-------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <h1>Employer Applicants</h1>

            {
                myposts.map((post) => {
                    return (
                        <>
                            <h2>{post.title}</h2>
                            <h3>Applied</h3>
                            {
                                post.applications.map((app) => {
                                    console.log(app)
                                    return (
                                        <>
                                        {
                                            (app.applicant.isRejected || app.applicant.isAccepted) ? ""
                                                :
                                                <>
                                                    <p>{app.applicant.first_name + " " + app.applicant.last_name}</p>
                                                    <button type="submit"
                                                        onClick={evt => {
                                                            // Prevent form from being submitted
                                                            evt.preventDefault()

                                                            const accepted = {
                                                                posting: post.id,
                                                                applicant: app.applicant.id
                                                            }

                                                            // Send POST request to your API
                                                            createAccepted(accepted)
                                                                .then(() => deleteApplied(app.id))
                                                                .then(() => {history.push("/applicants")}) //REFRESH PAGE AFTER APPLY
                                                        }}
                                                        className="btn btn-primary">accept</button>

                                                    <button type="submit"
                                                        onClick={evt => {
                                                            // Prevent form from being submitted
                                                            evt.preventDefault()

                                                            // Send POST request to your API
                                                            deleteApplied(app.id)
                                                                .then(() => history.push("/applicants")) //REFRESH PAGE AFTER APPLY
                                                        }}
                                                        className="btn btn-primary">deny</button>
                                                </>
                                            }
                                            </>
                                    )
                                })
                            }
                            <h3>Accepted</h3>
                            {
                                myAccepted.map((post) => {
                                    return (
                                        <>
                                        <p>{post.applicant.first_name + " " + post.applicant.last_name}</p>
                                        </>
                                    )
                                })
                            }
                        </>
                    )
                })
            }

        </>

    )
}