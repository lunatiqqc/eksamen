import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { get, imagesBaseUrl } from "../../lib/fetcher";

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

    return (
        <article className='my-12'>
            <h1 className='text-xl font-bold my-8'>Search results</h1>
            <ul className='flex flex-wrap gap-8 '>
                {searchValue
                    ? movies
                          ?.filter((movie) => {
                              const searchAble = [
                                  movie.title,
                                  movie.description,
                                  movie.director,
                                  movie.stars,
                                  movie.writers,
                                  movie.genres,
                              ];
                              const searchAbleConcat = searchAble.join("");
                              return searchAbleConcat.includes(searchValue);
                          })
                          .map((movie) => {
                              return (
                                  <li className='flex flex-wrap gap-4 animate-fadeinslow'>
                                      <figure className='flex-shrink-0 '>
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
                                      <div className='max-w-[50%]'>
                                          <p className='line-clamp-5'>
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
                          })
                    : null}
            </ul>
        </article>
    );
}
