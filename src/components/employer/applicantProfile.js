import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { createResume, getResume, getResumes } from "../fetches/resume"
import { getSkills, createSkill } from "../fetches/skills"
import 'animate.css'

export const ApplicantProfilePage = () => {
    const history = useHistory()
    const { applicantId } = useParams()
    const user = parseInt(localStorage.getItem("userId"))
    // Use States
    //-------------------------------------------------------------------------------------------------------------------

    const [profile, setProfile] = useState({
        resume: "",
        skills: []
    })
    const [created, setCreated] = useState(false)
    const [resumes, setResumes] = useState([])
    const [applicantProfile, setApplicantProfile] = useState({})
    const [resume, setResume] = useState({})
    const [skills, setSkills] = useState([])

    // Use Effects
    //-------------------------------------------------------------------------------------------------------------------


    useEffect(
        () => {
            getResumes()
                .then((data) => {
                    setResumes(data)
                })
        },
        []
    )

    useEffect(
        () => {
            setApplicantProfile(findCompany())
        },
        []
    )

    useEffect(
        () => {
            getResume(applicantProfile.id)
                .then((data) => {
                    setResume(data)
                })
        },
        []
    )



    // Functions/Objects
    //-------------------------------------------------------------------------------------------------------------------

    const findCompany = () => {
        const foundApplicant = resumes.filter((resume) => {
            return resume.applicant?.id == user
        })
        return foundApplicant
    }

    //-------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <div className="mainContainer">
                {


                    <div className="ProfileContainer animate__animated animate__zoomIn">
                        <h1>{resume.resume}</h1>
                        <p>{resume.skills}</p>
                    </div>

                }
            </div>
        </>

    )
}