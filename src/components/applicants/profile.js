import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { createResume, getResume, getResumes } from "../fetches/resume"

export const ApplicantProfile = () => {
    const history = useHistory()
    const user = parseInt(localStorage.getItem("userId"))
    // Use States
    //-------------------------------------------------------------------------------------------------------------------

    const [profile, setProfile] = useState({
        resume: "",
        skills: {}
    })
    const [created, setCreated] = useState(false)
    const [resumes, setResumes] = useState([])
    const [applicantProfile, setApplicantProfile] = useState({})
    const [resume, setResume] = useState({})

    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

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


    // Functions/Objects
    //-------------------------------------------------------------------------------------------------------------------
    
    const changeFormState = (domEvent) => {
        const copy = { ...profile }
        copy[domEvent.target.name] = domEvent.target.value

        setProfile(copy)
    }

    const findCompany = () => {
        const foundApplicant = resumes.filter((resume) => {
            return resume.applicant?.id == user
        })
        return foundApplicant
    }

    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleSubmission = () => {
		const formData = new FormData();

		formData.append('File', selectedFile);

		// fetch(
		// 	'https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>',
		// 	{
		// 		method: 'POST',
		// 		body: formData,
		// 	}
		// )
		// 	.then((response) => response.json())
		// 	.then((result) => {
		// 		console.log('Success:', result);
		// 	})
		// 	.catch((error) => {
		// 		console.error('Error:', error);
		// 	});

	};

    //-------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <h1>Applicant Profile</h1>
            {

                created ? 
                [<h1>{resume.resume}</h1>, <p>{resume.skills}</p>]
                : 
                <section className="ProfileForm">
                <form>
                <div>
			<input type="file" name="file" onChange={changeHandler} />
			{isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
		</div>
                    <label htmlFor="skills">skills:</label>
                    <textarea id="skills" name="skills" value={profile.skills} onChange={changeFormState} />
                   
                    <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            const formData = new FormData();

		                    formData.append('File', selectedFile);

                            const resume = {
                                resume: profile.resume,
                                skills: profile.skills
                            }

                            // Send POST request to your API
                            createResume(resume)
                                .then(() => history.push("/profile"))
                        }}
                        className="btn btn-primary">Create</button>
                </form>
            </section>
            }
        </>

    )
}