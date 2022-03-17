export const getJobPostings = () => {
    return fetch("http://localhost:8000/jobpostings", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
      }
    })
      .then(response => response.json())
  }
  
  export const createJobPosting = (post) => {
    return fetch("http://localhost:8000/jobpostings", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        'Content-Type': "application/json"
      },
      body: JSON.stringify(post)
    })
      .then(res => res.json())
  }
  
  export const getJobPost = (postId) => {
    return fetch(`http://localhost:8000/jobpostings/${postId}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('lu_token')}`
      }
    }).then(res => res.json())
  }
  
  export const updateJobPost = (post) => {
    return fetch(`http://localhost:8000/jobpostings/${post.id}`, {
      method: "Put",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        'Content-Type': "application/json"
      },
      body: JSON.stringify(post)
    })
  }
  
  export const deleteJobPost = (postId) => {
    return fetch(`http://localhost:8000/jobpostings/${postId}`, {
      method: "Delete",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
      },
    })
  }