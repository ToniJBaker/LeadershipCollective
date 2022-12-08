const apiUrl = "https://localhost:5001";


export const getConsultantRecommendations = () => {
    return fetch(`${apiUrl}/api/consultantRecommendation`)//http GET request all consultantRecommendations
      .then((res) => res.json())
  };

export const getConsultantRecommendationById = (id) => {
    return fetch(`${apiUrl}/api/consultantRecommendation/${id}`)//http GET single consultantRecommendation
    .then((res)=> res.json())
};

export const updateConsultantRecommendation = (consultantRecommendation) => {
    return fetch(`${apiUrl}/ConsultantRecommendation/${consultantRecommendation.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(consultantRecommendation)
    })
  };