import Navigation from "../components/navigation";
import {Grid, makeStyles} from "@material-ui/core";
import {useForm, Form} from "../components/useForm";
import Controls from "../components/control/Controls";
import {checkIfCookieAuthKey, checkIfCookieHaveEmail} from "../components/cookieController";
import {emailValidation as validate, emailValidation} from "../components/emailValidation";

import {useState} from "react";

const initialValues = {
    cookie: 0,
    email: ''
}



export default function Management() {
    console.log("cookie email:" + checkIfCookieHaveEmail()); // Pacman
    console.log("cookie authkey:" + checkIfCookieAuthKey()); // Pacman

    const {
        values,
        setValues,
        handleInputChange,
        sendData,
    } = useForm(initialValues);

    const errors = emailValidation(values);

    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>login!</h2>
            <Navigation />
            <br />
            Login:
            <Form>
                <Grid container>
                    <Grid items xs={9}>
                    <Controls.Input
                        name="email"
                        label="email"
                        value={values.email}
                        onChange={handleInputChange}

                        />
                        {errors.email}
                    </Grid>
                </Grid>
                <Controls.Button  text="Lähetä" onClick={sendData}>Lähetä</Controls.Button>
            </Form>
        </main>
    );
}
