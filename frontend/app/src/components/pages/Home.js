import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { get, imagesBaseUrl } from "../../lib/fetcher";
import filterMovies from "../../lib/filterMovies";
import MovieList from "../MovieList";

import { useSearchParams } from "react-router-dom";

export default function Home() {
    const { searchValue, setSearchValue } = useOutletContext();
    console.log(searchValue);
    const [movies, setMovies] = useState();
    const [comments, setComments] = useState();
    const [movieHovered, setMovieHovered] = useState();

    const [searchParams] = useSearchParams();

    const searchParamsString = searchParams.toString().slice(0, -1);

    useEffect(() => {
        get("Movies").then((json) => {
            setMovies(json);
        });
        //get("Comments").then((json) => {
        //    console.log(json);
        //    setComments(json);
        //});

        return () => {};
    }, []);

    useEffect(() => {
        if (movies) {
            if (searchValue) {
                setMovies((prev) => {
                    return prev.filter((movie) => {
                        return filterMovies(movie, searchValue);
                    });
                });
            }

            if (searchParamsString === "latestmovies") {
                setMovies((prev) => {
                    const copy = [...prev];

                    return copy.sort((a, b) => {
                        a = +new Date(a.releaseDate);
                        b = +new Date(b.releaseDate);

                        return b - a;
                    });
                });
            }
            if (searchParamsString === "allmovies") {
                console.log(true);
                setMovies((prev) => {
                    const copy = [...prev];
                    return copy.sort((a, b) => {
                        a = a.id;
                        b = b.id;

                        console.log(a, b);
                        return a - b;
                    });
                });
            }
        }
    }, [searchParamsString]);

    const queryToHeadingMapper = {
        allmovies: "All movies",
        latestmovies: "Latest movies",
        mostcommented: "Most commented movies",
    };

    return (
        <>
            {movies ? (
                <article className='my-12'>
                    <h1>
                        {queryToHeadingMapper[searchParamsString]}
                        <br />
                        {searchValue ? (
                            <span className='my-4 flex gap-4'>
                                {"Based on search: " + searchValue}
                                <button
                                    onClick={() => {
                                        setSearchValue("");
                                    }}
                                >
                                    Clear search
                                </button>
                            </span>
                        ) : null}
                    </h1>

                    <MovieList
                        //When we return a negative value, a takes precedence in sorting

                        movies={movies.filter((movie) => {
                            return filterMovies(movie, searchValue);
                        })}
                        amountToShow={
                            searchParamsString === "allmovies" ? null : 8
                        }
                        movieHovered={movieHovered}
                        setMovieHovered={setMovieHovered}
                    />
                </article>
            ) : null}
            {movies && comments ? (
                <article className='my-12'>
                    <h1>Most Commented</h1>

                    <MovieList
                        //When we return a negative value, a takes precedence in sorting
                        movies={movies
                            .filter((movie) => {
                                console.log(searchValue);
                                return searchValue
                                    ? filterMovies(movie, searchValue)
                                    : true;
                            })
                            .sort((a, b) => {
                                a = comments.filter((comment) => {
                                    return comment.movieId === a.id;
                                }).length;

                                b = comments.filter((comment) => {
                                    return comment.movieId === b.id;
                                }).length;

                                return b - a;
                            })}
                        movieHovered={movieHovered}
                        setMovieHovered={setMovieHovered}
                    />
                </article>
            ) : null}
        </>
    );
}
