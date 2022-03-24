import React, { useEffect, useState } from "react"
import { Route } from "react-router-dom"
import { Application } from './Application'
import { EmployerHome } from './components/employer/employerHome'
import { createCompany, getCompany, getCompanies } from "./components/fetches/company"
import { NavBar } from './components/employer/navbar'
import { EmployerPost } from './components/employer/employerPost'
import { EmployerPostings } from './components/employer/postings'
import { EmployerApplicants } from './components/employer/applicants'
import { EmployerProfile } from './components/employer/profile'
import { EmployerSearch } from './components/employer/search'
import { ApplicantJobPosts } from './components/applicants/jobposts'
import { ApplicantApplied } from './components/applicants/applied'
import { ApplicantAccepted } from './components/applicants/accepted'
import { ApplicantProfile } from './components/applicants/profile'
import { ApplicantNavBar } from './components/applicants/navbar'
import { EditEmployerPost } from './components/employer/editPost'
import { JobPost } from './components/applicants/jobpost'
import { ApplicantProfilePage } from './components/employer/applicantProfile'
import { EditEmployerProfile } from './components/employer/editProfile'
import { ApplicantEmployerProfile } from './components/applicants/employerPage'

const ApplicationViews = () => {
    const employer = localStorage.getItem('isEmployer')
    const user = parseInt(localStorage.getItem("userId"))

    const [companies, setCompanies] = useState([])
    const [companyProfile, setCompanyProfile] = useState({})
    const [company, setCompany] = useState({})

    // Use Effects
    //-------------------------------------------------------------------------------------------------------------------

    //FIND COMPANY THAT MATCHES EMPLOYER; IF FOUND DISPLAY DATA : ELSE DISPLAY FORM

    useEffect(
        () => {
            getCompanies()
                .then((data) => {
                    setCompanies(data)
                })
        },
        []
    )

    useEffect(
        () => {
            if (companies.length > 0) {
                setCompanyProfile(companies.find((comp) => {
                    return comp.employer.id == user
                }))
            }
        },
        [companies]
    )

    useEffect(
        () => {
            if (companyProfile?.id) {
                getCompany(companyProfile.id)
                    .then((data) => {
                        setCompany(data)
                    })
            }
        },
        [companyProfile]
    )

    return (
        <>

            <Route exact path="/post">
                {
                    employer == "true" ?
                        <>
                            <NavBar />
                            <EmployerPost />
                        </>
                        : ""
                }
            </Route>

            <Route exact path="/search">
                {
                    employer == "true" ?
                        <>
                            <NavBar />
                            <EmployerSearch />
                        </>
                        : ""
                }
            </Route>

            <Route exact path="/edit/:postId">
                {
                    employer == "true" ?
                        <>
                            <NavBar />
                            <EditEmployerPost />
                        </>
                        : ""
                }
            </Route>

            <Route exact path="/profileEdit/:companyId">
                {
                    employer == "true" ?
                        <>
                            <NavBar />
                            <EditEmployerProfile />
                        </>
                        : ""
                }
            </Route>

            <Route exact path="/postings">
                {
                    employer == "true" ?
                        <>
                            <NavBar />
                            <EmployerPostings />
                        </>
                        :
                        <>
                            <ApplicantNavBar />
                            <ApplicantJobPosts />
                        </>

                }
            </Route>

            <Route exact path="/post/:postId">
                {
                    employer == "true" ?
                        ""
                        :
                        <>
                            <ApplicantNavBar />
                            <JobPost />
                        </>
                }
            </Route>

            <Route exact path="/companyprofile/:companyId">
                {
                    employer == "true" ?
                        ""
                        :
                        <>
                            <ApplicantNavBar />
                            <ApplicantEmployerProfile />
                        </>
                }
            </Route>

            <Route exact path="/applicants">
                {
                    employer == "true" ?
                        <>
                            <NavBar />
                            <EmployerApplicants />
                        </>
                        : ""
                }
            </Route>

            <Route exact path="/applicant/:applicantId">
                {
                    employer == "true" ?
                        <>
                            <NavBar />
                            <ApplicantProfilePage />
                        </>
                        : ""
                }
            </Route>

            <Route exact path="/">
                {
                    employer == "true" && companyProfile == undefined ?
                        <>
                            <EmployerProfile />
                        </>
                        :
                        <>
                            {
                                employer == "true" ?
                                    <>
                                        <NavBar />
                                        <EmployerProfile />
                                    </>
                                    :
                                    <>
                                        <ApplicantNavBar />
                                        <ApplicantProfile />
                                    </>
                            }
                        </>
                }

            </Route>

            <Route exact path="/applied">
                {
                    employer == "true" ?
                        ""
                        :
                        <>
                            <ApplicantNavBar />
                            <ApplicantApplied />
                        </>
                }
            </Route>

            <Route exact path="/accepted">
                {
                    employer == "true" ?
                        ""
                        :
                        <>
                            <ApplicantNavBar />
                            <ApplicantAccepted />
                        </>
                }
            </Route>




        </>
    )
}

export default ApplicationViews