import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getSkills, createSkill } from "../fetches/skills"
import { createJobPosting } from "../fetches/jobpostings"
import { createCompany, getCompany, getCompanies } from "../fetches/company"
import "animate.css"

export const EmployerPost = () => {
    const history = useHistory()
    const user = parseInt(localStorage.getItem("userId"))
    // Use States
    //-------------------------------------------------------------------------------------------------------------------

    const [skills, setSkills] = useState([])
    const [newSkill, setNewSkill] = useState({
        skill: ""
    })
    const [posting, setPosting] = useState({
        title: "",
        description: "",
        company: "",
        skills: []
    })
    const [companies, setCompanies] = useState([])
    const [companyProfile, setCompanyProfile] = useState({})
    const [company, setCompany] = useState({})

    // Use Effects
    //-------------------------------------------------------------------------------------------------------------------

    useEffect(
        () => {
            getSkills()
                .then((data) => {
                    setSkills(data)
                })
        },
        []
    )

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

    // Functions/Objects
    //-------------------------------------------------------------------------------------------------------------------
    const changeSkillsState = (domEvent) => {
        const copy = { ...posting }
        const check = copy.skills.find((obj) => {
            return obj == domEvent.target.value
        })
        if (check) {
            const num = posting.skills.indexOf(check)
            copy[domEvent.target.name].splice(num, 1)
        } else {
            copy[domEvent.target.name].push(domEvent.target.value)
        }


        setPosting(copy)
    }

    const changeFormState = (domEvent) => {
        const copy = { ...posting }
        copy[domEvent.target.name] = (domEvent.target.value)


        setPosting(copy)
    }

    const changeSkillState = (domEvent) => {
        const copy = { ...newSkill }
        copy[domEvent.target.name] = domEvent.target.value

        setNewSkill(copy)
    }


    //-------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <div className="PostFormContainer animate__animated animate__zoomIn">
                <form className="PostForm">
                    <input type="text" id="jobtitle" name="title" defaultValue={posting.title} onChange={changeFormState} placeholder="Job Title: " />
                    <textarea id="jobdescription" name="description" defaultValue={posting.description} onChange={changeFormState} placeholder="Job Description: " />
                    <div className="skillsContainer">
                        {
                            skills.map((obj) => { return <> <div className="skills"><label htmlFor="skills">{obj.skill}</label> <input type="checkbox" id="postSkills" name="skills" defaultValue={obj.skill} onClick={changeSkillsState} /></div> </> })
                        }
                    </div>
                    <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            const jobposting = {
                                title: posting.title,
                                description: posting.description,
                                company: company.id,
                                skills: posting.skills
                            }

                            // Send POST request to your API
                            createJobPosting(jobposting)
                                .then(() => history.push("/postings"))
                        }}
                        className="PostButton">Create</button>
                </form>
            </div>

            {/* <label htmlFor="addSkill">Add Skill:</label>
            <input type="text" id="addSkill" name="skill" value={newSkill.skill} onChange={changeSkillState} />
            <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            const newskill = {
                                skill: newSkill.skill
                            }

                            // Send POST request to your API
                            createSkill(newSkill)
                                .then(() => history.push("/post"))
                        }}
                        className="btn btn-primary">Create</button> */}
        </>

    )
}