import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getJobPostings,deleteJobPost } from "../fetches/jobpostings"

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
                    if (post.employer.id == user) {
                        return (
                            <>
                                <h3>{post.title}</h3>
                                <p>{post.description}</p>
                                <h3>{post.skills}</h3>
                                <button type="submit"
                                    onClick={evt => {
                                        // Prevent form from being submitted
                                        evt.preventDefault()

                                        // Send POST request to your API
                                        deleteJobPost(post.id)
                                            .then(() => history.push("/postings")) //REFRESH PAGE AFTER APPLY
                                    }}
                                    className="btn btn-primary">delete</button>
                            </>
                        )
                    }
                })
            }

        </>

    )
}