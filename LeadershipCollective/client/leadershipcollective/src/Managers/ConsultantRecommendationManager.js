const apiUrl = "https://localhost:5001";


export const getConsultantRecommendations = () => {
    return fetch(`${apiUrl}/api/consultantRecommendation`)//http GET request all consultantRecommendations
      .then((res) => res.json())
  };

export const getConsultantRecommendationById = (id) => {
    return fetch(`${apiUrl}/api/consultantRecommendation/${id}`)//http GET single consultantRecommendation
    .then((res)=> res.json())
};

export const addConsultantRecommendation = (recBody)=> {
    return fetch(`${apiUrl}/api/ConsultantRecommendation`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(recBody),
    });

};


export const updateConsultantRecommendation = (consultantRecommendation) => {
    return fetch(`${apiUrl}/api/ConsultantRecommendation/${consultantRecommendation.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(consultantRecommendation)
    })
  };

  export const deleteConsultationRecommendation = (id)=> {
    return fetch(`${apiUrl}/api/ConsultantRecommendation/${id}`,{
        method:"DELETE"
    })
  };