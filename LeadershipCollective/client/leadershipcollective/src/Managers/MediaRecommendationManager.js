const apiUrl = "https://localhost:44309";


export const getMediaRecommendations = () => {
    return fetch(`${apiUrl}/api/MediaRecommendation`)//http GET request all mediaRecommendations
      .then((res) => res.json())
  };

export const getMediaRecommendationById = (id) => {
    return fetch(`${apiUrl}/api/MediaRecommendation/${id}`)//http GET single mediaRecommendation
    .then((res)=> res.json())
};

export const addMediaRecommendation = (recBody)=> {
    return fetch(`${apiUrl}/api/MediaRecommendation`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(recBody),
    });

};


export const updateMediaRecommendation = (mediaRecommendation) => {
    return fetch(`${apiUrl}/api/MediaRecommendation/${mediaRecommendation.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mediaRecommendation)
    })
  };

  export const deleteMediaRecommendation = (id)=> {
    return fetch(`${apiUrl}/api/MediaRecommendation/${id}`,{
        method:"DELETE"
    })
  };
  export const searchMediaRecommendationsBySubjectId = (id) => {
    return fetch(`${apiUrl}/api/MediaRecommendation/search/${id}`)//http GET single mediaRecommendation
    .then((res)=> res.json())
  };