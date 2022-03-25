import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { getApplied, deleteApplied } from "../fetches/applied"
import { getJobPostings } from "../fetches/jobpostings"
import "animate.css"

export const ApplicantApplied = () => {
    const user = parseInt(localStorage.getItem("userId"))
    const history = useHistory()
    // Use States
    //-------------------------------------------------------------------------------------------------------------------

    const [applied, setApplied] = useState([])
    const [myApplied, setMyApplied] = useState([])
    const [posts, setPosts] = useState([])

    // Use Effects
    //-------------------------------------------------------------------------------------------------------------------

    useEffect(
        () => {
            apply()
        },
        []
    )

    useEffect(
        () => {
            setMyApplied(applied.filter((app) => {
                return app.applicant.id == user
            }))
        },
        [applied]
    )

    useEffect(
        () => {
            getJobPostings()
                .then((data) => {
                    setPosts(data)
                })
        },
        []
    )


    // Functions/Objects
    //-------------------------------------------------------------------------------------------------------------------
    const apply = () => { getApplied().then((data) => { setApplied(data) }) }


    //-------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <div className="mainContainer">
                {
                    myApplied.map((applied) => {
                        return (
                            <>
                                <div className="ApplicantAppliedContainer animate__animated animate__zoomIn">
                                    <h3 className="hyperLink" onClick={() => { history.push(`/post/${applied.id}`) }}>{applied.posting.title}</h3>
                                    {/* <p>{applied.posting.description}</p> */}
                                    <p className="hyperLink" onClick={() => {history.push(`/companyprofile/${applied.posting?.company?.id}`)}}>{applied.posting?.company?.name}</p>
                                    <button type="submit"
                                    onClick={evt => {
                                        // Prevent form from being submitted
                                        evt.preventDefault()

                                        // Send POST request to your API
                                        deleteApplied(applied.id)
                                            .then(apply)
                                        // .then(() => history.push("/postings")) //REFRESH PAGE AFTER APPLY
                                    }}
                                    className="PostingsButton">delete</button>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </>

    )
}