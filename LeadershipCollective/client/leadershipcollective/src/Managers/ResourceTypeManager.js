const apiUrl = "https://localhost:5001";

export const getAllResourceTypes = () => {
    return fetch(`${apiUrl}/api/resourceType`)//http GET request 
      .then((res) => res.json())
  }