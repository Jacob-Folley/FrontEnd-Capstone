export const getEmployers = () => {
    return fetch("http://localhost:8000/employers", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
      }
    })
      .then(response => response.json())
  }
  
  export const createEmployer = (employer) => {
    return fetch("http://localhost:8000/employers", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        'Content-Type': "application/json"
      },
      body: JSON.stringify(employer)
    })
      .then(res => res.json())
  }
  
  export const getEmployer = (employerId) => {
    return fetch(`http://localhost:8000/employers/${employerId}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('lu_token')}`
      }
    }).then(res => res.json())
  }
  
  export const updateEmployers = (employer) => {
    return fetch(`http://localhost:8000/employers/${employer.id}`, {
      method: "Put",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        'Content-Type': "application/json"
      },
      body: JSON.stringify(employer)
    })
  }
  
  export const deleteEmployer = (employerId) => {
    return fetch(`http://localhost:8000/employers/${employerId}`, {
      method: "Delete",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
      },
    })
  }