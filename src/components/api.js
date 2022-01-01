import React from 'react';

export const apiController = async (action,baseURL,postData,setPostResult,fortmatResponse)=>{
    let apiPath="";
    switch(action) {
        case "login":
            apiPath = "login.php";
            break;
        case "add":
            apiPath = "add.php";
            break;
        default:
            apiPath = "";
    }
    console.log("apipath", apiPath)
            try {
        const res = await fetch(`${baseURL}/${apiPath}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });
        if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`;
            throw new Error(message);
        }

        const data = await res.json();
        const result = {
            status: res.status + "-" + res.statusText,
            headers: {
                "Content-Type": res.headers.get("Content-Type"),
                "Content-Length": res.headers.get("Content-Length"),
            },
            data: data,
        };
        return data;
    } catch (err) {
        setPostResult(err.message);
    }
}

