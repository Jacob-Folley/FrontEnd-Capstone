import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { createResume, getResume, getResumes } from "../fetches/resume"
import { getSkills, createSkill } from "../fetches/skills"
import 'animate.css';

export const ApplicantProfile = () => {
    const history = useHistory()
    const user = parseInt(localStorage.getItem("userId"))

    // Use States
    //-------------------------------------------------------------------------------------------------------------------

    const [profile, setProfile] = useState({
        applicant: user,
        resume: {},
        skills: []
    })
    const [created, setCreated] = useState(false)
    const [resumes, setResumes] = useState([])
    const [applicantProfile, setApplicantProfile] = useState({})
    const [resume, setResume] = useState({})

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [skills, setSkills] = useState([])
    const [image, setImage] = useState({})

    // Use Effects
    //-------------------------------------------------------------------------------------------------------------------

    //FIND COMPANY THAT MATCHES EMPLOYER; IF FOUND DISPLAY DATA : ELSE DISPLAY FORM

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
                    if (resume.resume) {
                        setCreated(true)
                    }
                })
        },
        []
    )

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
        const copy = { ...profile }

        const check = profile.skills.find((obj) => {
            return obj == domEvent.target.value
        })

        if (check) {
            const num = profile.skills.indexOf(check)
            copy[domEvent.target.name].splice(num, 1)
        } else {
            copy[domEvent.target.name].push(domEvent.target.value)
        }

        setProfile(copy)
    }

    const findCompany = () => {
        const foundApplicant = resumes.filter((resume) => {
            return resume.applicant?.id == user
        })
        return foundApplicant
    }

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const createResumeImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            const copy = { ...profile }
            copy.resume = base64ImageString

            setProfile(copy)
    
            // Update a component state variable to the value of base64ImageString
        });
    }

    //-------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <div className="mainContainer">
                {

                    created ?
                        [<div className="ProfileContainer"><h1>{resume.resume}</h1>, <p>{resume.skills}</p></div>]
                        :
                        <section  className="ProfileFormContainer animate__animated animate__zoomIn">
                            <form className="ProfileForm">
                                <input type="file" id="resume_image" onChange={createResumeImageString} />
                                <input type="hidden" name="resume_id" value={user} />
                                <div className="skillsContainer">
                                    {
                                        skills.map((obj) => { return <> <div className="skills"><label htmlFor="skills">{obj.skill}</label> <input type="checkbox" id="postSkills" name="skills" value={obj.skill} onClick={changeFormState} /></div> </> })
                                    }
                                </div>


                                <button type="submit"
                                    onClick={evt => {
                                        // Prevent form from being submitted
                                        evt.preventDefault()


                                        const resume = {
                                            applicant: user,
                                            resume: profile.resume,
                                            skills: profile.skills
                                        }

                                        // Send POST request to your API
                                        createResume(resume)
                                            .then(() => history.push("/"))
                                    }}
                                    className="PostButton">Create</button>
                            </form>
                        </section>
                }
            </div>
        </>

    )
}