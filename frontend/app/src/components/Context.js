import { createContext, useEffect, useState } from "react";
import { get, getUser } from "../lib/fetcher";

export const context = createContext();

export function MyProvider({ children }) {
    const [movies, setMovies] = useState();

    const [news, setNews] = useState();

    const [comments, setComments] = useState();

    const [token, setToken] = useState();

    const [user, setUser] = useState();

    useEffect(() => {
        get("Movies").then((json) => {
            setMovies(json);
        });
        get("News").then((json) => setNews(json));
        get("Comments").then((json) => setComments(json));

        const cookieEnabled = window.navigator.cookieEnabled;

        if (cookieEnabled) {
            const cookieToken = window.localStorage.getItem("token");

            if (cookieToken) {
                const tokenJson = JSON.parse(cookieToken);

                if (+new Date() < +new Date(tokenJson.expiry)) {
                    setToken(tokenJson.token);
                } else {
                    window.localStorage.removeItem("token");
                }
            }
        }

        return () => {};
    }, []);

    useEffect(() => {
        if (token) {
            console.log(token);
            getUser("Members/member", token).then((json) => {
                console.log(json);
                if (json) {
                    setUser(json);
                } else {
                    window.localStorage.removeItem("token");
                }
            });

            const cookieEnabled = window.navigator.cookieEnabled;

            if (cookieEnabled) {
                const cookieToken = window.localStorage.getItem("token");

                if (!cookieToken) {
                    let numWeeks = 2;
                    let now = new Date();
                    now.setDate(now.getDate() + numWeeks * 7);

                    window.localStorage.setItem(
                        "token",
                        JSON.stringify({ token: token, expiry: now })
                    );
                }
            }
        }

        return () => {};
    }, [token]);

    const { Provider } = context;
    return (
        <Provider
            value={{
                movies: movies,
                news: news,
                comments: comments,
                setComments: setComments,
                token: token,
                setToken: setToken,
                setUser: setUser,
                user: user,
            }}
        >
            {children}
        </Provider>
    );
}
