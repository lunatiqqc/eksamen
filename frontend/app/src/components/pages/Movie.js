import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { get, imagesBaseUrl } from "../../lib/fetcher";
import { context } from "../Context";

export default function Movie() {
    const { movies } = useContext(context);
    const { id } = useParams();

    const [movie, setMovie] = useState();

    const firstFocusElement = useRef();

    console.log(id);

    useEffect(() => {
        if (movies) {
            const movieDetails = movies.find((movie) => {
                return movie.id === parseInt(id);
            });

            console.log(movieDetails);
            setMovie(movieDetails);

            return () => {};
        }
    }, [movies]);

    useEffect(() => {
        firstFocusElement.current?.focus();
    }, [movie]);

    if (movie === undefined || movies === undefined) {
        return null;
    }

    return (
        <article className='grid gap-8 my-16'>
            <h1
                tabIndex='0'
                ref={firstFocusElement}
                className='font-bold text-2xl'
            >
                {movie.title}
            </h1>
            <table className=''>
                <tbody>
                    <tr>
                        <th tabIndex='0'>Age Rating: </th>
                        <td tabIndex='0'>{movie.rating}</td>
                        <th tabIndex='0'>Duration: </th>
                        <td tabIndex='0'>{movie.duration}</td>
                        <th tabIndex='0'>Genres: </th>
                        <td tabIndex='0'>{movie.genres}</td>
                        <th tabIndex='0'>Release Date: </th>
                        <td tabIndex='0'>{movie.releaseDate}</td>
                    </tr>
                </tbody>
            </table>

            <section className='grid md:grid-rows-[300px,400px] md:grid-cols-1 grid-cols-[1fr,3fr] gap-4'>
                <figure>
                    <img src={imagesBaseUrl + movie.image} alt={movie.title} />
                </figure>
                <section tabIndex='0' title={movie.title + " youtube trailer"}>
                    <iframe
                        className='w-full h-full'
                        src={movie.trailer.replace("watch?v=", "embed/")}
                    ></iframe>
                </section>
            </section>

            <table>
                <tbody>
                    <tr>
                        <th tabIndex='0'>DIRECTOR: </th>
                        <td tabIndex='0'>{movie.director}</td>
                    </tr>
                    <tr>
                        <th tabIndex='0'>WRITERS: </th>
                        <td tabIndex='0'>{movie.writers}</td>
                    </tr>
                    <tr>
                        <th tabIndex='0'>STARS: </th>
                        <td tabIndex='0'>{movie.stars}</td>
                    </tr>
                </tbody>
            </table>
            <section>
                <h2 tabIndex='0'>Description</h2>
                <p tabIndex='0' className='max-w-prose'>
                    {movie.description}
                </p>
            </section>

            <section>
                <h3>Comments</h3>
                <p>comments</p>
            </section>
        </article>
    );
}
