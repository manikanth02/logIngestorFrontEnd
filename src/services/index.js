import HttpService from "./http";
const {httpRequest} = HttpService();

const logIngestorServices = () => {
    const addLogIngestor = async (payload)  => new Promise((resolve,reject) => {
        httpRequest(
          "POST",
          "api/v1/createlog",
          payload
        )
        .then(resolve)
        .catch(reject)
      });

      const getLogIngestor = async (search)  => new Promise((resolve,reject) => {
        httpRequest(
          "GET",
          "api/v1/getLogs",
          {},
          search
        )
        .then(resolve)
        .catch(reject)
      })

      return {addLogIngestor,getLogIngestor}
}

export default logIngestorServices;