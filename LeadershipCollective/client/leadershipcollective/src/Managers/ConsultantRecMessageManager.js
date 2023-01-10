const apiUrl = "https://localhost:44309";


export const addConsultantRecMessage = (recBody)=> {
    return fetch(`${apiUrl}/api/ConsultantMessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(recBody),
    });

};

export const getConsultantRecMessageById = (id)=> {
    return fetch(`${apiUrl}/api/consultantMessage/${id}`)//http GET single consultant Recommendation Message
    .then((res)=> res.json())
};

export const deleteConsultantRecMessage = (id) => {
    return fetch(`${apiUrl}/api/ConsultantMessage/${id}`,{
        method:"DELETE"
    })
};
export const updateConsultantRecMessage = (consultantRecMessage)=>{
    return fetch(`${apiUrl}/api/ConsultantMessage/${consultantRecMessage.id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(consultantRecMessage)
    })
};

