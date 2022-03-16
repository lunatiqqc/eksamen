import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { get, imagesBaseUrl } from "../../lib/fetcher";
import filterMovies from "../../lib/filterMovies";
import EmptyArrayChecker from "../EmptyArrayChecker";

export default function SearchResults() {
    const { searchValue } = useOutletContext();
    const [movies, setMovies] = useState();
    const [messages, setMessages] = useState();
    const [movieHovered, setMovieHovered] = useState();

    useEffect(() => {
        get("Movies").then((json) => {
            setMovies(json);
        });
        get("Messages").then((json) => {
            console.log(json);
            setMessages(json);
        });
    }, []);

    function List() {
        return;
    }

    return searchValue && movies ? (
        <article className='my-12'>
            <h1 className='text-xl font-bold my-8'>Search results</h1>
            <ul className='flex flex-wrap gap-8'>
                <EmptyArrayChecker message='No results'>
                    {movies
                        .filter((movie) => filterMovies(movie, searchValue))
                        .map((movie) => {
                            return (
                                <li className='flex flex-wrap gap-4 animate-fadeinslow max-w-prose'>
                                    <figure className=''>
                                        <img
                                            src={
                                                imagesBaseUrl +
                                                "/" +
                                                movie.image
                                            }
                                            alt={movie.title}
                                            className='w-48'
                                        />
                                    </figure>
                                    <div className=''>
                                        <h1 className='text-xl font-bold pb-2'>
                                            {movie.title}
                                        </h1>
                                        <p className='line-clamp-5 max-w-prose'>
                                            {movie.description}
                                        </p>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th>Stars: </th>{" "}
                                                    <td>{movie.stars}</td>
                                                </tr>
                                                <tr>
                                                    <th>Director: </th>{" "}
                                                    <td>{movie.director}</td>
                                                </tr>
                                                <tr>
                                                    <th>Genres: </th>{" "}
                                                    <td>{movie.genres}</td>
                                                </tr>
                                                <tr>
                                                    <th>Writers: </th>{" "}
                                                    <td>{movie.writers}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </li>
                            );
                        })}
                </EmptyArrayChecker>
            </ul>
        </article>
    ) : (
        <div className='p-4 text-xl'>Empty searchfield</div>
    );
}
