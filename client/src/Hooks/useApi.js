import { useState } from "react";
const base_url = "http://localhost/api/";
function useApi() {
  const [ResponseData, updateData] = useState([]);
  const [isError, updateError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const Request = async (target, method, data = {}, headers = {}) => {
    setLoading(true);
    var requestData = {
      method: method,
      headers: headers,
    };

    method !== "GET" && (requestData.body = JSON.stringify(data));

    fetch(base_url + target, requestData)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.status === "Success") {
          updateData(response.data);
          updateError(false);
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));
  };

  return {
    Request,
    ResponseData,
    isError,
    isLoading,
  };
}

export default useApi;
