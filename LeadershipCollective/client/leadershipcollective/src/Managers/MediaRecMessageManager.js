const apiUrl = "https://localhost:44309";


export const addMediaRecMessage = (recBody)=> {
    return fetch(`${apiUrl}/api/MediaMessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(recBody),
    });

};

export const getMediaRecMessageById = (id)=> {
    return fetch(`${apiUrl}/api/MediaMessage/${id}`)//http GET single media Recommendation Message
    .then((res)=> res.json())
};

export const deleteMediaRecMessage = (id) => {
    return fetch(`${apiUrl}/api/MediaMessage/${id}`,{
        method:"DELETE"
    })
};
export const updateMediaRecMessage = (mediaRecMessage)=>{
    return fetch(`${apiUrl}/api/MediaMessage/${mediaRecMessage.id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mediaRecMessage)
    })
};

