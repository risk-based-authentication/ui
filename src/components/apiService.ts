import axios from 'axios';

const apiUrl = 'https://j3a4lvmip9.execute-api.eu-north-1.amazonaws.com/p';

export const getApiData = async (): Promise<any> => {
    axios.get(apiUrl + "/execution", {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    .then(response => {
        console.log('API Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
};