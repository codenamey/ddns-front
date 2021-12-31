import {Link} from "react-router-dom";
import logo from "../pictures/ddns_vertical.svg"
export default function Navigation() {
    return (
        <>
            <div className="row"
                 style={{
                     textTransform: "uppercase",
                     color: "#ccc",
                     background: "#6AB7EE",
                     fontVariantCaps: "caps"
                 }}

            >
                <div className="logo">
                    <img src={logo} width="300" style={{ padding: "-1rem"}} />
                </div>
            <nav
                style={{
                    paddingBottom: "1rem",
                    textTransform: "uppercase",
                    color: "#ccc",
                    fontVariantCaps: "caps",
                    padding: "1rem",
                }}
            >
                <Link to="/management" color="secondary" variant="inherit">Management</Link> {" "}
            </nav>
            </div>
        </>
    );
}
