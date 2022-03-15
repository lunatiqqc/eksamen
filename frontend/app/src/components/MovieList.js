import React from "react";
import { Link } from "react-router-dom";
import { imagesBaseUrl } from "../lib/fetcher";

export default function MovieList({
    movies,
    movieHovered,
    setMovieHovered,
    amountToShow,
}) {
    return (
        <ul className='flex flex-wrap gap-4 md:justify-center'>
            {movies.map((movie, i) => {
                if (amountToShow === null || i < amountToShow) {
                    const hovering = movieHovered === movie.id;
                    return (
                        <li
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
                                <figure>
                                    <img
                                        className='w-[160px] h-[240px]'
                                        src={imagesBaseUrl + movie.image}
                                        alt={movie.title}
                                    />
                                </figure>
                                <div
                                    className={
                                        "flex flex-col items-center justify-around animate-fadein sm:static sm:visible absolute z-10 inset-0 bg-neutral-700 bg-opacity-90 h-full w-full" +
                                        (hovering ? "" : " invisible")
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
                                </div>
                            </article>
                        </li>
                    );
                } else {
                    return null;
                }
            })}
        </ul>
    );
}
