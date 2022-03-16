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

            firstFocusElement.current?.focus();
            return () => {};
        }
    }, [movies]);

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
            <table>
                <tbody>
                    <tr>
                        <th>Age Rating: </th>
                        <td>{movie.rating}</td>
                        <th>Duration: </th>
                        <td>{movie.duration}</td>
                        <th>Genres: </th>
                        <td>{movie.genres}</td>
                        <th>Release Data: </th>
                        <td>{movie.releaseDate}</td>
                    </tr>
                </tbody>
            </table>

            <section className='grid md:grid-rows-[300px,400px] md:grid-cols-1 grid-cols-[1fr,3fr] gap-4'>
                <figure>
                    <img src={imagesBaseUrl + movie.image} alt={movie.title} />
                </figure>
                <iframe
                    className='w-full h-full'
                    src={movie.trailer.replace("watch?v=", "embed/")}
                ></iframe>
            </section>

            <table>
                <tbody>
                    <tr>
                        <th>DIRECTOR: </th>
                        <td>{movie.director}</td>
                    </tr>
                    <tr>
                        <th>WRITERS: </th>
                        <td>{movie.writers}</td>
                    </tr>
                    <tr>
                        <th>STARS: </th>
                        <td>{movie.stars}</td>
                    </tr>
                </tbody>
            </table>
            <section>
                <h2>Description</h2>
                <p className='max-w-prose'>{movie.description}</p>
            </section>

            <section>
                <h3>Comments</h3>
                <p>comments</p>
            </section>
        </article>
    );
}
