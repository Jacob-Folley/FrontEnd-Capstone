import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getSkills, createSkill } from "./fetches/skills"
import { createJobPosting } from "./fetches/jobpostings"

export const EmployerPost = () => {
    const history = useHistory()
    // Use States
    //-------------------------------------------------------------------------------------------------------------------

    const [skills, setSkills] = useState([])
    const [newSkill, setNewSkill] = useState({
        skill: ""
    })
    const [posting, setPosting] = useState({
        title: "",
        description: "",
        skills: []
    })

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


    // Functions/Objects
    //-------------------------------------------------------------------------------------------------------------------
    const changeFormState = (domEvent) => {
        const copy = { ...posting }
        if (domEvent.target.name == "skills") {
            copy[domEvent.target.name].push(domEvent.target.value)
        }
        else {
            copy[domEvent.target.name] = domEvent.target.value
        }

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
            <h1>Employer Post</h1>

            <section className="PostForm">
                <form>
                    <label htmlFor="jobtitle">Job Title:</label>
                    <input type="text" id="jobtitle" name="title" value={posting.title} onChange={changeFormState} />
                    <label htmlFor="lname">Job Description:</label>
                    <textarea id="description" name="description" value={posting.description} onChange={changeFormState} />
                    {
                        skills.map((obj) => { return <> <label htmlFor="skills">{obj.skill}</label> <input type="radio" id="postSkills" name="skills" value={obj.skill} onClick={changeFormState} /> </>})
                    }
                    <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            const jobposting = {
                                title: posting.title,
                                description: posting.description,
                                skills: posting.skills
                            }

                            // Send POST request to your API
                            createJobPosting(jobposting)
                                .then(() => history.push("/postings"))
                        }}
                        className="btn btn-primary">Create</button>
                </form>
            </section>

            <label htmlFor="addSkill">Add Skill:</label>
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
                        className="btn btn-primary">Create</button>
        </>

    )
}