import { createContext, useEffect, useState } from "react";
import { get, post, put } from "../lib/fetcher";

export const context = createContext();

export function MyProvider({ children }) {
    const [movies, setMovies] = useState();

    const [news, setNews] = useState();

    const [comments, setComments] = useState();

    useEffect(() => {
        get("Movies").then((json) => {
            setMovies(json);
        });
        get("News").then((json) => setNews(json));
        return () => {};
    }, []);

    const { Provider } = context;
    return (
        <Provider
            value={{
                movies: movies,
                news: news,
                comments: comments,
            }}
        >
            {children}
        </Provider>
    );
}
