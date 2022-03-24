import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { getApplicants } from "../fetches/applicants"
import "animate.css"

export const EmployerSearch = () => {
    const user = parseInt(localStorage.getItem("lu_token"))
    const history = useHistory()
    // Use States
    //-------------------------------------------------------------------------------------------------------------------

    const [applicants, setApplicants] = useState([])
    const [search, setSearch] = useState('')

    // Use Effects
    //-------------------------------------------------------------------------------------------------------------------

    useEffect(
        () => {
            getApplicants()
                .then((data) => {
                    setApplicants(data)
                })
        },
        []
    )

    useEffect(
        () => {
            search === "" ? getApplicants().then((data) => { setApplicants(data) }) :
                setApplicants(applicants.filter((post) => {
                    let fullname = post.user?.first_name + " " + post.user?.last_name
                    return fullname.toLowerCase().includes(search.toLowerCase())
                }))

        },
        [search]
    )


    // Functions/Objects
    //-------------------------------------------------------------------------------------------------------------------

    const searchFunction = () => {
        const foundApplicant = applicants.find((app) => {
            let fullname = app.user?.first_name + " " + app.user?.last_name
            return fullname === search
        })
        // if (foundApplicant) {
        //     history.push(`/anime/${foundApplicant.id}`)

        // }
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
            <div className="SearchAppContainer animate__animated animate__zoomIn">
            {
                applicants.map((app) => {
                    if (app.isEmployer != true) {
                        return (
                            <>
                                <p className="hyperLink" onClick={() => {history.push(`/applicant/${app.id}`)}} id="SearchAppName">{app.user?.first_name + " " + app.user?.last_name}</p>
                            </>
                        )
                    }
                })

            }
            </div>
        </>

    )
}