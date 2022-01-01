import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core";
import { setOwnCookie } from "./cookieController";
import {emailValidation as validate} from "../components/emailValidation";
import {apiController} from "./api";

const initApiValues = {
    cookie: 0,
    email: ''
}

export  function  useForm(initialFValues) {
    const baseURL = "http://192.168.178.38:8002";
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
        let postData = {}
        let data = null;
        if (values.subDNS){
            const authKey = "1931805c-3234-422d-b6f6-8e8deccfa3d9";
            console.log("pim", values.subDNS);
            console.log("pim", values.ipaddress);
            postData = {
                ip: values.ipaddress,
                domain: values.subDNS,
                authKey: authKey
            };
            data = await apiController("add", baseURL,postData,setPostResult);
            console.log("dataa", data)

        } else {
            postData = {
                email: values.email,
            };
            data = await apiController("login", baseURL,postData,setPostResult);
            const authKey = data["authKey"];
            setOwnCookie("authKey", authKey);
            console.log("authKey", data["authKey"])
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
