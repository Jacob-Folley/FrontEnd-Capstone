import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { getJobPostings } from "../fetches/jobpostings"
import { createApplied } from "../fetches/applied"

export const ApplicantJobPosts = () => {
    const user = parseInt(localStorage.getItem("userId"))
    const history = useHistory()

    // Use States
    //-------------------------------------------------------------------------------------------------------------------

    const [posts, setPosts] = useState([])

    // Use Effects
    //-------------------------------------------------------------------------------------------------------------------

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
    


    //-------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <h1>Applicant Job Posts</h1>
            {
                posts.map((post) => {
                    return (
                        <>
                        <h2>{post.title}</h2>
                        <p>{post.description}</p>
                        <p></p>
                        <h3>{post.employer?.username}</h3>
                        <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            const apply = {
                                posting: post.id,
                                applicant: user
                            }

                            // Send POST request to your API
                            createApplied(apply)
                                .then(() => history.push("/postings"))
                        }}
                        className="btn btn-primary">apply</button>
                        </>
                    )
                })
            }
        </>

    )
}