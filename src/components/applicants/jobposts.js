import React, { useEffect, useState } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import { getJobPostings } from "../fetches/jobpostings"
import { createApplied, getApplied } from "../fetches/applied"
import { getAccepted } from "../fetches/accepted"
import 'animate.css';

export const ApplicantJobPosts = () => {
    const user = parseInt(localStorage.getItem("userId"))
    const history = useHistory()

    // Use States
    //-------------------------------------------------------------------------------------------------------------------

    const [posts, setPosts] = useState([])
    const [userApplied, setApplied] = useState([])
    const [currentApplication, setApplication] = useState([])
    const [accepted, setAccepted] = useState([])
    const [currentAccepted, setMyAccepted] = useState([])
    const [search, setSearch] = useState('')

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
            appliedList()
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

    useEffect(
        () => {
            acceptedList()
        },
        []
    )

    useEffect(
        () => {
            setMyAccepted(accepted.filter((app) => {
                return app.applicant.id == user
            }))
        },
        [accepted]
    )

    useEffect(
        () => {
            search === "" ? getJobPostings().then((data) => { setPosts(data) }) :
                setPosts(posts.filter((post) => {
                    let title = post.title
                    return title.toLowerCase().includes(search.toLowerCase())
                }))

        },
        [search]
    )


    // Functions/Objects
    //-------------------------------------------------------------------------------------------------------------------
    const appliedList = () => { getApplied().then((data) => { setApplied(data) }) }
    const acceptedList = () => { getAccepted().then((data) => { setAccepted(data) }) }

    const searchFunction = () => {
        const foundPost = posts.find((app) => {
            let title = app.title
            return title === search
        })
    }


    //-------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <div className="searchContainer animate__animated animate__fadeInDown">

                <input className="searchBar" onChange={(e) => {
                    const searchItem = e.target.value
                    setSearch(searchItem);
                }} type="text" placeholder="search..."></input>
                <button className="submit" type="submit" onClick={() => { searchFunction() }}>go</button>

            </div>
            {
                posts.map((post) => {
                    const foundApplied = currentApplication.find((obj) => {
                        return post.id == obj.posting.id
                    })
                    const foundAccepted = currentAccepted.find((obj) => {
                        return post.id == obj.posting.id
                    })
                    return (
                        <>

                            {foundApplied || foundAccepted ? ""
                                :
                                <>
                                    <div className="animate__animated animate__zoomIn" id="SearchEmployerContainer">
                                        <div className="jobTitle">
                                            <h3 className="hyperLink" onClick={() => {history.push(`/post/${post.id}`)}}>{post.title}</h3>
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
                                        </div>
                                        <p className="hyperLink" onClick={() => {history.push(`/companyprofile/${post.company?.id}`)}}>{post.company?.name}</p>
                                        {/* <p>{post.description}</p> */}
                                        <p></p>
                                    </div>
                                </>
                            }
                        </>
                    )
                })
            }
        </>

    )
}