import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { getJobPostings } from "../fetches/jobpostings"
import { createApplied, getApplied } from "../fetches/applied"

export const ApplicantJobPosts = () => {
    const user = parseInt(localStorage.getItem("userId"))
    const history = useHistory()

    // Use States
    //-------------------------------------------------------------------------------------------------------------------

    const [posts, setPosts] = useState([])
    const [userApplied, setApplied] = useState([])
    const [currentApplication, setApplication] = useState([])

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

    useEffect(
        () => {
            getApplied()
                .then((data) => {
                    setApplied(data)
                })
        },
        []
    )

    useEffect(
        () => {
            setApplication(userApplied.filter((app) => {
                return app.applicant.id == user
            }))
        },
        [userApplied]
    )


    // Functions/Objects
    //-------------------------------------------------------------------------------------------------------------------



    //-------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <h1>Applicant Job Posts</h1>
            {
                posts.map((post) => {
                    const found = currentApplication.find((obj) => {
                        return post.id == obj.posting.id
                    })
                    return (
                        <>
                            {found ? ""
                            :
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
                                            .then(() => history.push("/postings")) //REFRESH PAGE AFTER APPLY
                                    }}
                                    className="btn btn-primary">apply</button>
                                    </>
                                }
                        </>
                    )
                })
            }
        </>

    )
}