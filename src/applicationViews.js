import React from "react"
import { Route } from "react-router-dom"
import { Application } from './Application'
import { EmployerHome } from './components/employer/employerHome'
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

const ApplicationViews = () => {
    const employer = localStorage.getItem('isEmployer') 
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

            <Route exact path="/">
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