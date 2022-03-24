export const getApplicants = () => {
    return fetch("http://localhost:8000/applicants", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
      }
    })
      .then(response => response.json())
  }
  
  export const getApplicant = (applicantId) => {
    return fetch(`http://localhost:8000/applicants/${applicantId}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('lu_token')}`
      }
    }).then(res => res.json())
  }
  
  export const updateApplicant = (applicant) => {
    return fetch(`http://localhost:8000/applicants/${applicant.id}`, {
      method: "Put",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        'Content-Type': "application/json"
      },
      body: JSON.stringify(applicant)
    })
  }
  
  export const deleteApplicant = (applicantId) => {
    return fetch(`http://localhost:8000/applicants/${applicantId}`, {
      method: "Delete",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
      },
    })
  }