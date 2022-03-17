export const getCompanies = () => {
    return fetch("http://localhost:8000/company", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
      }
    })
      .then(response => response.json())
  }
  
  export const createCompany = (company) => {
    return fetch("http://localhost:8000/company", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        'Content-Type': "application/json"
      },
      body: JSON.stringify(company)
    })
      .then(res => res.json())
  }
  
  export const getCompany = (companyId) => {
    return fetch(`http://localhost:8000/company/${companyId}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('lu_token')}`
      }
    }).then(res => res.json())
  }
  
  export const updateCompany = (company) => {
    return fetch(`http://localhost:8000/company/${company.id}`, {
      method: "Put",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        'Content-Type': "application/json"
      },
      body: JSON.stringify(company)
    })
  }
  
  export const deleteCompany = (companyId) => {
    return fetch(`http://localhost:8000/company/${companyId}`, {
      method: "Delete",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
      },
    })
  }