import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getSkills, createSkill } from "../fetches/skills"
import { getJobPost, updateJobPost } from "../fetches/jobpostings"
import 'animate.css'

export const EditEmployerPost = () => {
    const history = useHistory()
    const { postId } = useParams()

    // Use States
    //-------------------------------------------------------------------------------------------------------------------

    const [skills, setSkills] = useState([])
    const [posting, setPosting] = useState({
        title: "",
        description: "",
        company: "",
        skills: []
    })
    const [jobpost, setJobPost] = useState([])

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
            getJobPost(postId)
                .then((data) => {
                    setJobPost(data)
                })
        },
        []
    )


    // Functions/Objects
    //-------------------------------------------------------------------------------------------------------------------
    const changeFormState = (domEvent) => {
        const copy = { ...posting }
        if (domEvent.target.name == "skills") {
            const check = copy.skills.find((obj) => {
                return obj == domEvent.target.value
            })
            if (check) {
                const num = posting.skills.indexOf(check)
                copy[domEvent.target.name].splice(num, 1)
            } else {
                copy[domEvent.target.name].push(domEvent.target.value)
            }
        }
        else {
            copy[domEvent.target.name] = domEvent.target.value
        }

        setPosting(copy)
    }


    //-------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <div className="PostFormContainer animate__animated animate__zoomIn">
                <form className="PostForm">
                    <input type="text" id="jobtitle" name="title" defaultValue={jobpost.title} onChange={changeFormState} placeholder="Job Title: " />
                    <textarea id="jobdescription" name="description" defaultValue={jobpost.description} onChange={changeFormState} placeholder="Job Description: " />
                    <div className="skillsContainer">
                        {
                            skills.map((obj) => { return <> <div className="skills"><label htmlFor="skills">{obj.skill}</label> <input type="checkbox" id="postSkills" name="skills" defaultValue={obj.skill} onClick={changeFormState} /></div> </> })
                        }
                    </div>
                    <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            const jobposting = {
                                id: jobpost.id,
                                title: posting.title,
                                description: posting.description,
                                company: jobpost.company?.id,
                                skills: posting.skills
                            }

                            // Send POST request to your API
                            updateJobPost(jobposting)
                                .then(() => history.push("/postings"))
                        }}
                        className="PostButton">Create</button>
                </form>
            </div>
        </>

    )
}