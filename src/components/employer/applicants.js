import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { deleteApplied } from "../fetches/applied"
import { getJobPostings } from "../fetches/jobpostings"
import { createAccepted, getAccepted } from "../fetches/accepted"
import 'animate.css'

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
            jobPosts()
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
            accpetedPosts()
        },
        []
    )

    useEffect(
        () => {
            if (accepted.length > 0) {
                setMyAccepted(accepted.filter((post) => {
                    return post.posting?.employer?.id == user
                }))
            }
        },
        [accepted]
    )


    // Functions/Objects
    //-------------------------------------------------------------------------------------------------------------------
    const jobPosts = () => { getJobPostings().then((data) => { setJobPostings(data) }) }
    const accpetedPosts = () => { getAccepted().then((data) => { setAccepted(data) }) }

    //-------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <div className="AppContainer">
                {
                    myposts.map((post) => {
                        return (
                            <>
                                <div className="ApplicantsContainer animate__animated animate__zoomIn">
                                    <h2 className="ApplicantTitle">{post.title}</h2>
                                    <div className="ApplicantsAppAccContainer">
                                        <div className="ApplicantsApplied">
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
                                                                        <p className="hyperLink" onClick={() => {history.push(`/applicant/${app.id}`)}}>{app.applicant.first_name + " " + app.applicant.last_name}</p>
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
                                                                                    .then(accpetedPosts)
                                                                                    .then(() => deleteApplied(app.id))
                                                                                    .then(jobPosts)
                                                                                // .then(() => {history.push("/applicants")}) //REFRESH PAGE AFTER APPLY
                                                                            }}
                                                                            className="btn btn-primary">accept</button>

                                                                        <button type="submit"
                                                                            onClick={evt => {
                                                                                // Prevent form from being submitted
                                                                                evt.preventDefault()

                                                                                // Send POST request to your API
                                                                                deleteApplied(app.id)
                                                                                    .then(jobPosts)
                                                                                // .then(() => history.push("/applicants")) //REFRESH PAGE AFTER APPLY
                                                                            }}
                                                                            className="btn btn-primary">deny</button>
                                                                    </>
                                                            }
                                                        </>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="ApplicantsAccepted">
                                            <h3>Accepted</h3>
                                            {
                                                myAccepted.map((accept) => {
                                                    return (
                                                        <>
                                                            {accept.posting.id == post.id ?
                                                                <p className="hyperLink" onClick={() => {history.push(`/applicant/${accept.id}`)}}>{accept.applicant.first_name + " " + accept.applicant.last_name}</p>
                                                                :
                                                                ""
                                                            }

                                                        </>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </>

    )
}