import { useEffect, useState } from "react";
import {
    BrowserRouter,
    Link,
    Outlet,
    Route,
    Routes,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import Home from "./components/pages/Home";
import { get } from "./lib/fetcher";

import {
    AiFillFacebook,
    AiFillTwitterSquare,
    AiFillInstagram,
    AiFillYoutube,
    AiOutlineUser,
    AiOutlineSearch,
} from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

import "./index.css";

function App() {
    const [news, setNews] = useState();
    const [movies, setMovies] = useState();
    const [searchValue, setSearchValue] = useState("");

    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const [showLoginButton, setShowLoginButton] = useState(true);
    const [showSearchButton, setShowSearchButton] = useState(true);

    const [searchParams] = useSearchParams();

    const searchParamsString = searchParams.toString().slice(0, -1);

    function handleWindowResize() {
        if (window.innerWidth > 767) {
            setShowLogin(false);
            setShowSearch(false);
        }
    }

    function handleWindowScroll() {
        const prevScroll = this.prevScroll;

        if (window.scrollY > prevScroll) {
            setShowSearchButton(false);
            setShowLoginButton(false);
        } else {
            setShowSearchButton(true);
            setShowLoginButton(true);
        }
        this.prevScroll = window.scrollY;
    }

    const navigate = useNavigate();
    useEffect(() => {
        get("News").then((json) => setNews(json));
        get("Movies").then((json) => setMovies(json));

        window.addEventListener("resize", handleWindowResize);
        window.addEventListener("scroll", handleWindowScroll);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
            window.removeEventListener("scroll", handleWindowScroll);
        };
    }, []);

    const links = [
        { text: "Home", link: "/" },
        { text: "News", link: "/news" },
        { text: "Contact", link: "/contact" },
    ];

    function handleSearchChange(e) {
        setSearchValue(e.target.value);
    }

    function handleSearchSubmit(e) {
        e.preventDefault();

        navigate("/search", { state: searchValue });
    }

    const filterToQueryMapper = {
        "Show All": "allmovies",
        "Latest Movies": "latestmovies",
        "Most Commented": "mostcommented",
    };
    const queryToFilterMapper = {
        allmovies: "Show All",
        latestmovies: "Latest Movies",
        mostcommented: "Most Commented",
    };

    return (
        <div className='md:px-2 px-16 bg-neutral-900 text-slate-50'>
            <header className='grid gap-4 md:sticky -top-12 bg-neutral-900 z-30'>
                <nav className='grid gap-4 md:relative'>
                    <ul className='flex justify-end gap-2'>
                        {[
                            { icon: <AiFillFacebook size={30} />, link: "/" },
                            {
                                icon: <AiFillTwitterSquare size={30} />,
                                link: "/",
                            },
                            { icon: <AiFillInstagram size={30} />, link: "/" },
                            { icon: <AiFillYoutube size={30} />, link: "/" },
                        ].map((item, i) => {
                            return (
                                <li key={i}>
                                    <Link to={item.link}>{item.icon}</Link>
                                </li>
                            );
                        })}
                    </ul>
                    <section className='flex flex-wrap justify-between my-8 relative'>
                        <Link to='/' className='text-2xl font-bold'>
                            <h1>MOVIE HUNTER</h1>
                        </Link>
                        <button
                            onClick={() => {
                                setShowMobileMenu((prev) => {
                                    return !prev;
                                });
                            }}
                            className='hidden md:block bg-transparent invert'
                        >
                            <GiHamburgerMenu size='30' />
                        </button>
                        <ul
                            className={
                                "position absolute inset-0 top-full flex-col bg-white text-black z-20 w-full h-fit gap-4 " +
                                (showMobileMenu ? " flex" : " hidden")
                            }
                        >
                            {links.map((item, i) => {
                                return (
                                    <li className='text-center' key={i}>
                                        <Link
                                            className='text-xl '
                                            to={item.link}
                                        >
                                            {item.text}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                        <ul className={"md:hidden flex gap-4"}>
                            {links.map((item, i) => {
                                return (
                                    <li key={i}>
                                        <Link to={item.link}>{item.text}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>

                    <section className='flex flex-wrap justify-between'>
                        <ul className='flex gap-4'>
                            {[
                                { text: "Show All" },
                                { text: "Latest Movies" },
                                { text: "Most Commented" },
                            ].map((item, i) => {
                                return (
                                    <li key={i}>
                                        <Link
                                            className={
                                                queryToFilterMapper[
                                                    searchParamsString
                                                ] === item.text
                                                    ? "text-orange-500"
                                                    : ""
                                            }
                                            to={
                                                "/?" +
                                                filterToQueryMapper[item.text]
                                            }
                                        >
                                            {item.text}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                        <form
                            onSubmit={handleSearchSubmit}
                            className='ml-auto w-fit block md:hidden'
                            action=''
                        >
                            <input
                                type='search'
                                value={searchValue}
                                onChange={handleSearchChange}
                            />
                            <button>Search</button>
                        </form>
                    </section>

                    <section className='md:w-full w-fit ml-auto flex justify-end gap-4 md:absolute md:top-full'>
                        <form
                            className='flex flex-wrap gap-4 md:hidden'
                            action=''
                        >
                            <input
                                type='email'
                                placeholder='Email...'
                                required
                            />
                            <input
                                type='text'
                                placeholder='Password...'
                                required
                            />
                            <button className='px-4'>Login</button>
                            <button className='bg-transparent text-white'>
                                Not a member?
                            </button>
                        </form>
                        {showLogin ? (
                            <form
                                className='absolute w-fit right-0 top-full z-20 flex gap-4 flex-wrap gap-4 h-fit bg-neutral-800  p-4'
                                action=''
                            >
                                <input
                                    type='email'
                                    placeholder='Email...'
                                    required
                                />
                                <input
                                    type='text'
                                    placeholder='Password...'
                                    required
                                />
                                <button className='px-4'>Login</button>
                                <button className='bg-transparent text-white'>
                                    Not a member?
                                </button>
                            </form>
                        ) : null}
                        {showSearch ? (
                            <form
                                onSubmit={handleSearchSubmit}
                                className='absolute right-0 top-full w-fit flex gap-4 h-fit bg-neutral-800 p-4'
                                action=''
                            >
                                <input
                                    type='search'
                                    value={searchValue}
                                    onChange={handleSearchChange}
                                />
                                <button>Search</button>
                            </form>
                        ) : null}

                        <button
                            onClick={() => {
                                setShowSearch((prev) => {
                                    if (prev === false) {
                                        setShowLogin(false);
                                    }
                                    return !prev;
                                });
                            }}
                            className={
                                " hidden relative md:block" +
                                (showSearchButton
                                    ? " animate-fadefromtop"
                                    : " animate-fadetotop")
                            }
                        >
                            <AiOutlineSearch size={36} />
                        </button>

                        <button
                            onClick={() => {
                                setShowLogin((prev) => {
                                    if (prev === false) {
                                        setShowSearch(false);
                                    }

                                    return !prev;
                                });
                            }}
                            className={
                                "hidden md:block relative" +
                                (showLoginButton
                                    ? " animate-fadefromtop"
                                    : " animate-fadetotop")
                            }
                        >
                            <AiOutlineUser size='36' />
                        </button>
                    </section>
                </nav>
            </header>
            <main>
                <Outlet
                    context={{
                        searchValue: searchValue,
                        setSearchValue: setSearchValue,
                    }}
                ></Outlet>
            </main>
            <footer>
                <section className='grid md:grid-cols-1 grid-cols-2 gap-4'>
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
                                    <li key={i} className='my-4'>
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
                                    <li key={i} className='my-4'>
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
                    {links.map((item, i) => {
                        return (
                            <li key={i}>
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
