import React from 'react';
import Cookies from "universal-cookie";

export  function checkIfCookieHaveEmail() {
    return new Cookies().get("email");;
}

export  function checkIfCookieAuthKey() {
    return new Cookies().get("authKey");;
}

export  function setOwnCookie(name, value) {
    return new Cookies().set(name, value, { path: '/' });
}
