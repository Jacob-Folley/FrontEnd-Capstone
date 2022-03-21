export const getAccepted = () => {
    return fetch("http://localhost:8000/accepted", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
      }
    })
      .then(response => response.json())
  }
  
  export const createAccepted = (accepted) => {
    return fetch("http://localhost:8000/accepted", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        'Content-Type': "application/json"
      },
      body: JSON.stringify(accepted)
    })
      .then(res => res.json())
  }
  
  export const getAccept = (acceptedId) => {
    return fetch(`http://localhost:8000/accepted/${acceptedId}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('lu_token')}`
      }
    }).then(res => res.json())
  }
  
  export const updateAccepted = (accepted) => {
    return fetch(`http://localhost:8000/accepted/${accepted.id}`, {
      method: "Put",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        'Content-Type': "application/json"
      },
      body: JSON.stringify(accepted)
    })
  }
  
  export const deleteAccepted = (acceptedId) => {
    return fetch(`http://localhost:8000/accepted/${acceptedId}`, {
      method: "Delete",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
      },
    })
  }