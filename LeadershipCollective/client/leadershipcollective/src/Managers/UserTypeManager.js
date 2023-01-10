const apiUrl = "https://localhost:44309";

export const getAllUserTypes = () => {
    return fetch(`${apiUrl}/api/UserType`)//http GET request or  `/api/userProfile`
      .then((res) => res.json())
  };

