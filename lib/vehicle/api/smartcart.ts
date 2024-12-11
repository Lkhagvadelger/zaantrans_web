export const getVehiclePublicData = async (plateNumber: string) => {
    //https://xyp-api.smartcar.mn/xyp-api/v1/xyp/get-data-public - post 
    // body: 
    //  {
    //     "customFields":{
    //         "plateNumber":"4884УНҮ"
    //     },
    //     "serviceCode":"WS100401_getVehicleInfo"
    // }
    //use fetch

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "customFields": {
            "plateNumber": plateNumber
        },
        "serviceCode": "WS100401_getVehicleInfo"
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect
    };


    const response = await fetch("https://xyp-api.smartcar.mn/xyp-api/v1/xyp/get-data-public", requestOptions);
    const data = await response.json();
    return data;
};

