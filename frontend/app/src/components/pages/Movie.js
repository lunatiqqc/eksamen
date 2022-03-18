import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { imagesBaseUrl, post } from "../../lib/fetcher";
import { context } from "../Context";

export default function Movie() {
    const { movies, comments, setComments, token, user } = useContext(context);
    const { id } = useParams();

    const [form, setForm] = useState();

    const [movie, setMovie] = useState();

    const firstFocusElement = useRef();

    useEffect(() => {
        if (movies) {
            const movieDetails = movies.find((movie) => {
                return movie.id === parseInt(id);
            });

            setMovie(movieDetails);

            return () => {};
        }
    }, [movies]);

    useEffect(() => {
        firstFocusElement.current?.focus();
    }, [movie]);

    function handleChange(e) {
        setForm((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const copy = { ...form };

        copy.alias = user.alias || "";

        copy.movieId = movie.id;

        const comment = await post("Comments", JSON.stringify(copy), token);

        if (comment) {
            setComments((prev) => {
                return [...prev, comment];
            });
            setForm();
        }
    }

    if (movie === undefined || movies === undefined) {
        return null;
    }

    return (
        <article className='grid gap-8 mt-8 mb-8'>
            <div className='flex justify-between'>
                <h1
                    tabIndex='0'
                    ref={firstFocusElement}
                    className='font-bold text-2xl'
                >
                    {movie.title}
                </h1>
                <span>
                    Comments:{" "}
                    {
                        comments?.filter((comment) => {
                            return comment.movieId === movie.id;
                        }).length
                    }
                </span>
            </div>
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

            <section className='flex flex-wrap sm:justify-center'>
                <figure className='min-w-[200px] basis-1/3'>
                    <img src={imagesBaseUrl + movie.image} alt={movie.title} />
                </figure>
                {movie.trailer ? (
                    <section
                        className='basis-2/3 aspect-video flex-grow'
                        tabIndex='0'
                        title={movie.title + " youtube trailer"}
                    >
                        <iframe
                            className='w-full h-full '
                            src={movie.trailer.replace("watch?v=", "embed/")}
                        ></iframe>
                    </section>
                ) : null}
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
                <form
                    className='flex flex-col gap-2 my-8'
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    action=''
                >
                    <textarea
                        disabled={user === undefined}
                        className='max-w-prose'
                        placeholder={
                            user === undefined
                                ? "Membership required to comment"
                                : "write here..."
                        }
                        name='message'
                        id=''
                        cols='30'
                        rows='5'
                        value={form?.message || ""}
                    ></textarea>

                    {user ? (
                        <button className='p-2 w-fit text-lg'>Post</button>
                    ) : null}
                </form>

                {comments ? (
                    <ul className='flex gap-4 flex-col-reverse'>
                        {comments
                            .filter((comment) => {
                                return comment.movieId === movie.id;
                            })
                            .map((comment, i) => {
                                return (
                                    <li key={i}>
                                        <article>
                                            <h1>
                                                {comment.alias || "Anonymous"} -{" "}
                                                <span className='text-orange-500'>
                                                    {new Date(
                                                        comment.date
                                                    ).toLocaleDateString()}
                                                </span>
                                            </h1>
                                            <p>{comment.message}</p>
                                        </article>
                                    </li>
                                );
                            })}
                    </ul>
                ) : null}
            </section>
        </article>
    );
}
