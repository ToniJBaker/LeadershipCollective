const apiUrl = "https://localhost:5001";

export const getAllSubjects = () => {
    return fetch(`${apiUrl}/api/subject`)//http GET request 
      .then((res) => res.json())
  }