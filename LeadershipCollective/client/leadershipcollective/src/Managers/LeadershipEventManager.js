const apiUrl = "https://localhost:5001";

export const getAllEvents = () => {
    return fetch(`${apiUrl}/api/LeadershipEvent`)//http GET request all events
    .then((res) => res.json())
};