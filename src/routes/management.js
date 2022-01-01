import { useState } from "react";
import Navigation from "../components/navigation";
import Controls from "../components/control/Controls";

import Cookies from 'universal-cookie';
import {checkIfCookieAuthKey, checkIfCookieHaveEmail} from "../components/cookieController";
import {Link} from "react-router-dom";
import {Form, useForm} from "../components/useForm";
import {Grid} from "@material-ui/core";

const cookies = new Cookies();
console.log("emailx" + checkIfCookieAuthKey());
var joo = checkIfCookieAuthKey();

const initialValues = {
    cookie: 0,
    email: ''
}


export default function Management() {
    const {
        values,
        setValues,
        handleInputChange,
        sendData,
    } = useForm(initialValues);

    const [isLoggedUser, setLoggedUser] = useState(false);
    if(checkIfCookieAuthKey() && !isLoggedUser){
        setLoggedUser(true);
    }

    console.log("checkIfCookieAuthKey", checkIfCookieAuthKey());

    return (
      <main style={{ margin: "0",    padding: "0rem 0" }}>
          {isLoggedUser
            ? <>
                  <Navigation/><br/>
                  <Form>
                      <Grid container>
                          <Grid items xs={3}>
                              <Controls.Input
                                  name="subDNS"
                                  label="SubDNS"
                                  value={values.subDNS}
                                  onChange={handleInputChange}

                              />
                              <Controls.Input
                                  name="ipaddress"
                                  label="ipaddress"
                                  value={values.ipaddress}
                                  onChange={handleInputChange}

                              />
                          </Grid>
                          <Grid items xs={3} style={{ lineHeight: "36px"}}>
                              {values.subDNS ? "domain  name: " + values.subDNS + ".ddns.fi" : ''}<br />
                              {values.subDNS ? "points to ip: " + values.ipaddress + "" : ''}
                          </Grid>
                      </Grid>
                      <Controls.Button  text="Lähetä" onClick={sendData}>Lähetä</Controls.Button>
                  </Form>
                </>
              :
              <>
                  <Link to="/login">Kirjaudu</Link>

              </>
          }
      </main>
    );
  }
