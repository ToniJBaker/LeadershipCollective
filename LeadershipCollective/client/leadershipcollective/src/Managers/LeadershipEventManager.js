const apiUrl = "https://localhost:44309";

export const getAllEvents = () => {
    return fetch(`${apiUrl}/api/LeadershipEvent`)//http GET request all events
    .then((res) => res.json())
};

export const getEventById = (id) => {
    return fetch(`${apiUrl}/api/LeadershipEvent/${id}`)//http GET single consultantRecommendation
    .then((res)=> res.json())
};

export const addEvent = (eventBody)=> {
    return fetch(`${apiUrl}/api/LeadershipEvent`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventBody),
    });
};

export const updateEvent = (event) => {
    return fetch(`${apiUrl}/api/LeadershipEvent/${event.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event)
    })
  };

  export const deleteEvent = (id)=> {
    return fetch(`${apiUrl}/api/LeadershipEvent/${id}`,{
        method:"DELETE"
    })
  };