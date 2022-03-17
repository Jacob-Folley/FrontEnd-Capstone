export const getApplied = () => {
    return fetch("http://localhost:8000/applied", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
      }
    })
      .then(response => response.json())
  }
  
  export const createApplied = (applied) => {
    return fetch("http://localhost:8000/applied", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        'Content-Type': "application/json"
      },
      body: JSON.stringify(applied)
    })
      .then(res => res.json())
  }
  
  export const getApply = (appliedId) => {
    return fetch(`http://localhost:8000/applied/${appliedId}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('lu_token')}`
      }
    }).then(res => res.json())
  }
  
  export const updateApplied = (applied) => {
    return fetch(`http://localhost:8000/applied/${applied.id}`, {
      method: "Put",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        'Content-Type': "application/json"
      },
      body: JSON.stringify(applied)
    })
  }
  
  export const deleteApplied = (appliedId) => {
    return fetch(`http://localhost:8000/applied/${appliedId}`, {
      method: "Delete",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
      },
    })
  }