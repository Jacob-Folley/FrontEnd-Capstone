import React from "react"
import { Route } from "react-router-dom"
import { Application } from './Application'
import { EmployerHome } from './components/employerHome'
import { NavBar } from './components/navbar'
import { EmployerPost } from './components/employerPost'
import { EmployerPostings } from './components/postings'
import { EmployerApplicants } from './components/applicants'
import { EmployerProfile } from './components/profile'
import { EmployerSearch } from './components/search'
// import { ContactModule } from './components/contact/contact'

const ApplicationViews = () => {
    const employer = localStorage.getItem('isEmployer') == 'true'
    const applicant = localStorage.getItem('isEmployer') == 'false'
    return (
        <>

            <Route exact path="/">
                <NavBar />
                <EmployerHome />
            </Route>

            <Route exact path="/post">
                {
                    employer ?
                        <>
                            <NavBar />
                            <EmployerPost />
                        </>
                        : ""
                }
            </Route>

            <Route exact path="/search">
                {
                    employer ?
                        <>
                            <NavBar />
                            <EmployerSearch />
                        </>
                        : ""
                }
            </Route>

            <Route exact path="/postings">
                {
                    employer ?
                        <>
                            <NavBar />
                            <EmployerPostings />
                        </>
                        : ""
                }
            </Route>

            <Route exact path="/applicants">
                {
                    employer ?
                        <>
                            <NavBar />
                            <EmployerApplicants />
                        </>
                        : ""
                }
            </Route>

            <Route exact path="/profile">
                {
                    employer ?
                        <>
                            <NavBar />
                            <EmployerProfile />
                        </>
                        : ""
                }
            </Route>

            <Route exact path="/mainReact">
                {/* <MainReact /> */}
            </Route>

            <Route exact path="/skills">
                {/* <SkillModule /> */}
            </Route>

            <Route exact path="/contact">
                {/* <ContactModule /> */}
            </Route>

        </>
    )
}

export default ApplicationViews