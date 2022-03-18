import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { MyProvider } from "./components/Context";
import ComingSoon from "./components/pages/ComingSoon";
import Contact from "./components/pages/Contact";
import Dashboard from "./components/pages/Dashboard";
import Home from "./components/pages/Home";
import Member from "./components/pages/Member";
import Movie from "./components/pages/Movie";
import News from "./components/pages/News";
import NewsDetails from "./components/pages/NewsDetails";
import SearchResults from "./components/pages/SearchResults";
import { imagesBaseUrl } from "./lib/fetcher";
import swagger from "./lib/swagger.json";

ReactDOM.render(
    <React.StrictMode>
        <MyProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App />}>
                        <Route index element={<Home />}></Route>
                        <Route
                            path='upcoming-movies'
                            element={<ComingSoon />}
                        ></Route>
                        <Route path='member' element={<Member />}></Route>
                        <Route path='movie/:id' element={<Movie />}></Route>
                        <Route path='news' element={<News />}></Route>
                        <Route
                            path='news/:id'
                            element={<NewsDetails />}
                        ></Route>
                        <Route path='contact' element={<Contact />}></Route>
                        <Route
                            path='search'
                            element={<SearchResults />}
                        ></Route>
                    </Route>
                    <Route
                        path='/dashboard'
                        element={
                            <Dashboard
                                swagger={swagger}
                                endpointToSwaggerComponentMapper={{
                                    Contacts: "Contact",
                                    Messages: "Message",
                                    Movies: "Movie",
                                    News: "News",
                                    Members: "Member",
                                    Login: "MemberLogin",
                                    Comments: "Comment",
                                }}
                                imageBaseUrl={imagesBaseUrl}
                            />
                        }
                    ></Route>
                </Routes>
            </BrowserRouter>
        </MyProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
