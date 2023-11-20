import axios from "axios";
const HttpService = () => {
    const httpRequest = ( method ,url,data ,params ) => new Promise((resolve, reject) => {
        axios({
            method, 
            url: `http://localhost:3000/${url}`,
            data,
            params
        })
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => {
                console.log(err);
                reject(err.response);
            });
    });
    return {httpRequest};

}


export default HttpService;