const apiUrl = "https://localhost:44309";

export const getAllResourceTypes = () => {
    return fetch(`${apiUrl}/api/resourceType`)//http GET request 
      .then((res) => res.json())
  };