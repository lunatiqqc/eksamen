import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { imagesBaseUrl } from "../lib/fetcher";
import { context } from "./Context";

export default function MovieList({ movies, amountToShow, filter }) {
    console.log(filter);
    const { comments } = useContext(context);

    const [movieHovered, setMovieHovered] = useState();

    const [filteredMovies, setFilteredMovies] = useState(movies);

    useEffect(() => {
        if (filter === "Latest Movies") {
            setFilteredMovies((prev) => {
                const copy = [...movies];

                copy.sort((a, b) => {
                    a = +new Date(a.releaseDate);
                    b = +new Date(b.releaseDate);

                    return b - a;
                });
                return copy;
            });
        }

        if (filter === "Show All") {
            setFilteredMovies((prev) => {
                return movies;
            });
        }

        return () => {};
    }, [filter]);

    if (filteredMovies === undefined) {
        return null;
    }

    return (
        <ul className='flex flex-wrap gap-4 md:justify-center'>
            {filteredMovies.map((movie, i) => {
                if (amountToShow !== undefined && i >= amountToShow) {
                    return null;
                }
                const hovering = movieHovered === movie.id;
                return (
                    <li
                        tabIndex='0'
                        className='w-[160px]'
                        key={i}
                        onMouseOver={() => {
                            setMovieHovered(movie.id);
                        }}
                        onMouseOut={() => {
                            setMovieHovered();
                        }}
                    >
                        <article className='relative'>
                            <figure className='w-[160px] h-[240px]'>
                                <img
                                    className='object-cover'
                                    src={imagesBaseUrl + movie.image}
                                    alt={movie.title}
                                />
                            </figure>
                            <section
                                className={
                                    "flex flex-col items-center justify-around animate-fadein sm:static sm:visible absolute z-10 inset-0 bg-neutral-700 bg-opacity-90 h-full w-full" +
                                    (hovering ? "visible" : " invisible")
                                }
                            >
                                <h1 className='text-center text-xl p-4'>
                                    {movie.title}
                                </h1>
                                <Link
                                    to={"movie/" + movie.id}
                                    className='underline p-4'
                                >
                                    More
                                </Link>
                            </section>
                        </article>
                    </li>
                );
            })}
        </ul>
    );
}
