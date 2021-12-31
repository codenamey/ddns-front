import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core";
import { setOwnCookie } from "./cookieController";
import {emailValidation as validate} from "../components/emailValidation";

export  function  useForm(initialFValues) {
    const baseURL = "http://192.168.178.21:8002";
    const [values, setValues] = useState(initialFValues);
    const [postResult, setPostResult] = useState(null);
    const fortmatResponse = (res) => {
        return JSON.stringify(res, null, 2);
    }
    const handleInputChange = async e => {
        const {name, value} = e.target;

        setValues({
            ...values,
            [name]: value
        })
    }


    const sendData = async ()=> {
        console.log("joooo")

        const errors = validate(values);
        if(!errors.hasOwnProperty("email")){
            setOwnCookie('email', values.email)
            console.log("asetettu");
        }

        console.log("values"+values.email);
        const postData = {
            email: values.email,
        };

        if (values.subDNS){
            console.log("pim", values.subDNS);
        } else {
            try {
                const res = await fetch(`${baseURL}/login.php`, {
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
                const authKey = data["authKey"];
                setPostResult(fortmatResponse(result));
                setOwnCookie("authKey", authKey);
            } catch (err) {
                setPostResult(err.message);
            }

        }

    }


    return {
        values,
        setValues,
        handleInputChange,
        sendData
    }
}

const useStyle = makeStyles(theme => ({
    root:{
        '& .MuiGrid-root': {
            width: '80%',
            margin: theme.spacing(1)
        }

    }
}))

export  function Form(props: any){

    const classes = useStyle();

    return (
        <form className={classes.root} onSubmit={props.sendData}>
            {props.children}
        </form>
    )
}
