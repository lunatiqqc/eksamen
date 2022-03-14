import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get, imagesBaseUrl } from "../../lib/fetcher";

export default function Home() {
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

        return () => {};
    }, []);

    return (
        <article>
            <header>
                <nav>
                    <ul className='flex'>
                        {[
                            { text: "Show All" },
                            { text: "Latest Trailers" },
                            { text: "Most Commented" },
                        ].map((item) => {
                            return <li>{item.text}</li>;
                        })}
                    </ul>
                    <form action=''>
                        <input type='search' />
                        <button>Search</button>
                    </form>
                </nav>
                <aside>
                    <form action=''>
                        <input type='text' placeholder='Email...' />
                        <input type='text' placeholder='Password...' />
                        <button>Login</button>
                        <button>Not a member?</button>
                    </form>
                </aside>
            </header>
            <main>
                <ul className='grid grid-cols-8 gap-4'>
                    {movies?.map((movie, i) => {
                        if (i < 8) {
                            const hovering = movieHovered === movie.id;
                            return (
                                <li
                                    key={i}
                                    onMouseOver={() => {
                                        setMovieHovered(movie.id);
                                    }}
                                    onMouseOut={() => {
                                        setMovieHovered();
                                    }}
                                >
                                    <article className='relative'>
                                        <div
                                            className={
                                                "absolute bg-neutral-700 h-full w-full" +
                                                (hovering
                                                    ? " flex flex-col items-center justify-around animate-fadein "
                                                    : " hidden")
                                            }
                                        >
                                            <h1 className='text-center'>
                                                {movie.title}
                                            </h1>
                                            <Link
                                                to={"movie/" + movie.id}
                                                className='underline '
                                            >
                                                More
                                            </Link>
                                        </div>
                                        <figure>
                                            <img
                                                src={
                                                    imagesBaseUrl + movie.image
                                                }
                                                alt={movie.title}
                                            />
                                        </figure>
                                    </article>
                                </li>
                            );
                        } else {
                            return null;
                        }
                    })}
                </ul>
                <ul className='grid grid-cols-8 gap-4'>
                    {movies?.map((movie, i) => {
                        if (i < 8) {
                            return (
                                <li key={i}>
                                    <figure>
                                        <img
                                            src={imagesBaseUrl + movie.image}
                                            alt={movie.title}
                                        />
                                    </figure>
                                </li>
                            );
                        } else {
                            return null;
                        }
                    })}
                </ul>
            </main>
        </article>
    );
}
