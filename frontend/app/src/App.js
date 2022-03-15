import { useEffect, useState } from "react";
import {
    BrowserRouter,
    Link,
    Outlet,
    Route,
    Routes,
    useNavigate,
} from "react-router-dom";
import Home from "./components/pages/Home";
import { get } from "./lib/fetcher";

function App() {
    const [news, setNews] = useState();
    const [movies, setMovies] = useState();
    const [searchValue, setSearchValue] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        get("News").then((json) => setNews(json));
        get("Movies").then((json) => setMovies(json));

        return () => {};
    }, []);

    const links = [
        { text: "Home", link: "/" },
        { text: "News", link: "/news" },
        { text: "Contant", link: "/contact" },
    ];

    function handleSearchChange(e) {
        setSearchValue(e.target.value);
    }

    function handleSearchSubmit(e) {
        e.preventDefault();

        navigate("/search", { state: searchValue });
    }

    return (
        <div className='App px-16 bg-neutral-900 text-slate-50'>
            <header className='grid gap-4'>
                <nav className='flex justify-between my-8'>
                    <Link to='/' className='text-2xl font-bold'>
                        <h1>MOVIE HUNTER</h1>
                    </Link>

                    <ul className='flex gap-4'>
                        {links.map((item) => {
                            return (
                                <li>
                                    <Link to={item.link}>{item.text}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <form
                    onSubmit={handleSearchSubmit}
                    className='ml-auto w-fit'
                    action=''
                >
                    <input
                        type='search'
                        value={searchValue}
                        onChange={handleSearchChange}
                    />
                    <button>Search</button>
                </form>

                <aside className='ml-auto w-fit'>
                    <form className='grid grid-flow-col gap-4' action=''>
                        <input type='text' placeholder='Email...' />
                        <input type='text' placeholder='Password...' />
                        <button>Login</button>
                        <button>Not a member?</button>
                    </form>
                </aside>
            </header>
            <main>
                <Outlet context={{ searchValue: searchValue }}></Outlet>
            </main>
            <footer>
                <section className='grid grid-cols-2 gap-4'>
                    <article>
                        <div className='flex justify-between'>
                            <h1>News</h1>
                            <Link className='text-orange-500' to='/news'>
                                See All
                            </Link>
                        </div>
                        <ul>
                            {news?.map((news, i) => {
                                if (i > 5) {
                                    return null;
                                }
                                return (
                                    <li className='my-4'>
                                        <article>
                                            <time
                                                className='text-sm'
                                                dateTime={news.date}
                                            >
                                                {news.date}
                                            </time>
                                            <h1 className='text-orange-500 line-clamp-1'>
                                                {news.title}
                                            </h1>
                                            <p className='line-clamp-2'>
                                                {news.content}
                                            </p>
                                            <Link
                                                to='/newsdetails'
                                                className='underline text-orange-500'
                                            >
                                                Read More
                                            </Link>
                                        </article>
                                    </li>
                                );
                            })}
                        </ul>
                    </article>
                    <article>
                        <div className='flex justify-between'>
                            <h1>Coming Soon</h1>
                            <Link className='text-orange-500' to='/'>
                                See All
                            </Link>
                        </div>
                        <ul>
                            {movies?.map((movie, i) => {
                                if (i > 3) {
                                    return null;
                                }
                                return (
                                    <li className='my-4'>
                                        <article>
                                            <time
                                                className='text-sm'
                                                dateTime={movie.releaseDate}
                                            >
                                                {movie.releaseDate}
                                            </time>
                                            <h1 className='text-orange-500 line-clamp-1'>
                                                {movie.title}
                                            </h1>
                                            <p className='line-clamp-2'>
                                                {movie.description}
                                            </p>
                                            <Link
                                                to={"/movie/" + movie.id}
                                                className='underline text-orange-500'
                                            >
                                                Read More
                                            </Link>
                                        </article>
                                    </li>
                                );
                            })}
                        </ul>
                    </article>
                </section>

                <ul className='flex justify-center underline opacity-50 gap-2'>
                    {links.map((item) => {
                        return (
                            <li>
                                <Link to={item.link}>{item.text}</Link>
                            </li>
                        );
                    })}
                </ul>

                <div className='text-center my-4'>&copy;Movie Hunter ApS</div>
            </footer>
        </div>
    );
}

export default App;
