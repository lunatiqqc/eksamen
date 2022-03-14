import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "./components/pages/Home";
import Movie from "./components/pages/Movie";
import News from "./components/pages/News";
import NewsDetails from "./components/pages/NewsDetails";
import "./index.css";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<Home />}></Route>
                    <Route path='movie/:id' element={<Movie />}></Route>
                    <Route path='news' element={<News />}></Route>
                    <Route path='newsdetails' element={<NewsDetails />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
