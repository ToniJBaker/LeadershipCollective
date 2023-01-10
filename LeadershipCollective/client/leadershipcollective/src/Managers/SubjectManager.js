const apiUrl = "https://localhost:44309";

export const getAllSubjects = () => {
    return fetch(`${apiUrl}/api/Subject`)//http GET list of all Subjects 
      .then((res) => res.json())
  };

  export const getSubjectById = (id)=> {
    return fetch(`${apiUrl}/api/Subject/${id}`)//http GET single subject
    .then((res)=> res.json())
  };