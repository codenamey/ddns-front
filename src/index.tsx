import { render } from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import App from "./App";
import Expenses from "./routes/expenses";
import Management from "./routes/management";
import Login from "./routes/login";

const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="management" element={<Management />} />
            <Route path="login" element={<Login />} />
            <Route path="login:id" element={<Login />} />
        </Routes>
    </BrowserRouter>,
    rootElement
);
