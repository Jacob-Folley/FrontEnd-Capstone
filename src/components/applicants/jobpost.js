import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getSkills, createSkill } from "../fetches/skills"
import { getJobPost } from "../fetches/jobpostings"
import { createApplied, getApplied } from "../fetches/applied"

export const JobPost = () => {
    const history = useHistory()
    const user = parseInt(localStorage.getItem("userId"))
    const { postId } = useParams()

    // Use States
    //-------------------------------------------------------------------------------------------------------------------
    const [post, setPost] = useState({})
    const [userApplied, setApplied] = useState([])

    // Use Effects
    //-------------------------------------------------------------------------------------------------------------------
    useEffect(
        () => {
            getJobPost(postId)
                .then((data) => {
                    setPost(data)
                })
        },
        []
    )

    useEffect(
        () => {
            appliedList()
        },
        []
    )


    // Functions/Objects
    //-------------------------------------------------------------------------------------------------------------------
    const appliedList = () => { getApplied().then((data) => { setApplied(data) }) }

    //-------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <div className="mainContainer">
                <div className="SearchEmployerContainer">
                    <div className="jobTitle">
                        <h2>{post.title}</h2>
                        {userApplied.length > 0 ? "" :
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
                                        .then(appliedList)
                                    // .then(() => history.push("/postings")) //REFRESH PAGE AFTER APPLY
                                }}
                                className="applyButton">apply</button>
                        }
                    </div>
                    <h3>{post.employer?.username}</h3>
                    <p>{post.description}</p>
                    <p></p>
                </div>
            </div>
        </>

    )
}