export const getResumes = () => {
    return fetch("http://localhost:8000/resumes", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
      }
    })
      .then(response => response.json())
  }
  
  export const createResume = (resume) => {
    return fetch("http://localhost:8000/resumes", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        'Content-Type': "application/json"
      },
      body: JSON.stringify(resume)
    })
      .then(res => res.json())
  }
  
  export const getResume = (resumeId) => {
    return fetch(`http://localhost:8000/resumes/${resumeId}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('lu_token')}`
      }
    }).then(res => res.json())
  }
  
  export const updateResumes = (resume) => {
    return fetch(`http://localhost:8000/resumes/${resume.id}`, {
      method: "Put",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        'Content-Type': "application/json"
      },
      body: JSON.stringify(resume)
    })
  }
  
  export const deleteEmployer = (resumeId) => {
    return fetch(`http://localhost:8000/resumes/${resumeId}`, {
      method: "Delete",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
      },
    })
  }