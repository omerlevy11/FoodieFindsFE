import axios from "axios";

export const getRestaurantsByCity = async (city: string): Promise <Record<string,string>[]> => {
    const encodedParams = new URLSearchParams();
    encodedParams.set('location_id', city);
    encodedParams.set('language', 'en_US');
    encodedParams.set('currency', 'USD');
    encodedParams.set('offset', '18');

    const options = {
        method: 'POST',
        url: 'https://worldwide-restaurants.p.rapidapi.com/search',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'f225e02d8amsh4ce6a1b864dac2cp11bceejsna2c27a41fbcf',
            'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com'
        },
        data: encodedParams,
    };

    try {
        const response = await axios.request(options);
       return(response.data.results.data);
    } catch (error) {
        console.error(error);
    }
}

