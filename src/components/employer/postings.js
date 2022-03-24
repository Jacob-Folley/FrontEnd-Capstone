import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getJobPostings, deleteJobPost } from "../fetches/jobpostings"
import "animate.css"

export const EmployerPostings = () => {
    const user = parseInt(localStorage.getItem("userId"))
    const history = useHistory()

    // Use States
    //-------------------------------------------------------------------------------------------------------------------

    const [postings, setPostings] = useState([])

    // Use Effects
    //-------------------------------------------------------------------------------------------------------------------

    useEffect(
        () => {
            jobPosts()
        },
        []
    )


    // Functions/Objects
    //-------------------------------------------------------------------------------------------------------------------
    const jobPosts = () => { getJobPostings().then((data) => { setPostings(data) }) }


    //-------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <div className="PostingsContainer">
                {
                    postings.map((post) => {
                        if (post.employer.id == user) {
                            return (
                                <>
                                    <div className="PostingContainer animate__animated animate__zoomIn">
                                        <div className="PostingsInformation">
                                            <h3>{post.title}</h3>
                                            <p>{post.description}</p>
                                            <h3>{post.skills}</h3>
                                        </div>
                                        <div className="PostingsDeleteEdit">
                                            <button type="submit"
                                                onClick={evt => {
                                                    // Prevent form from being submitted
                                                    evt.preventDefault()
                                                    history.push(`/edit/${post.id}`)
                                                }}
                                                className="PostingsButton">edit</button>

                                            <button type="submit"
                                                onClick={evt => {
                                                    // Prevent form from being submitted
                                                    evt.preventDefault()

                                                    // Send POST request to your API
                                                    deleteJobPost(post.id)
                                                        .then(jobPosts)
                                                    // .then(() => history.push("/postings")) //REFRESH PAGE AFTER APPLY
                                                }}
                                                className="PostingsButton">delete</button>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    })
                }
            </div>

        </>

    )
}