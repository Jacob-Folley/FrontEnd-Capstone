export const getSkills = () => {
    return fetch("http://localhost:8000/skills", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
      }
    })
      .then(response => response.json())
  }
  
  export const createSkill = (skill) => {
    return fetch("http://localhost:8000/skills", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        'Content-Type': "application/json"
      },
      body: JSON.stringify(skill)
    })
      .then(res => res.json())
  }
  
  export const getSkill = (skillId) => {
    return fetch(`http://localhost:8000/skills/${skillId}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('lu_token')}`
      }
    }).then(res => res.json())
  }
  
  export const updateGame = (skill) => {
    return fetch(`http://localhost:8000/skills/${skill.id}`, {
      method: "Put",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        'Content-Type': "application/json"
      },
      body: JSON.stringify(skill)
    })
  }
  
  export const deleteGame = (skillId) => {
    return fetch(`http://localhost:8000/skills/${skillId}`, {
      method: "Delete",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
      },
    })
  }