const apiUrl = "https://localhost:5001";


export const addConsultantRecMessage = (recBody)=> {
    return fetch(`${apiUrl}/api/ConsultantMessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(recBody),
    });

};