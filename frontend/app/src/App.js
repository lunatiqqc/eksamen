import { useContext, useEffect, useRef, useState } from "react";
import {
    AiFillFacebook,
    AiFillInstagram,
    AiFillTwitterSquare,
    AiFillYoutube,
    AiOutlineSearch,
    AiOutlineUser,
} from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { context } from "./components/Context";
import ListArticle from "./components/ListArticle";
import "./index.css";
import { login } from "./lib/fetcher";

function App() {
    const { movies, news, setToken, setUser, user } = useContext(context);

    const location = useLocation();
    const navigate = useNavigate();

    const [filter, setFilter] = useState();

    const [searchValue, setSearchValue] = useState("");

    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const [showLoginButton, setShowLoginButton] = useState(true);
    const [showSearchButton, setShowSearchButton] = useState(true);

    const [form, setForm] = useState();

    const mobileMenuRef = useRef();

    const mounted = useRef();

    function handleWindowResize() {
        if (window.innerWidth > 767) {
            setShowSearch(false);
            setShowLogin(false);
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

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        window.addEventListener("scroll", handleWindowScroll);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
            window.removeEventListener("scroll", handleWindowScroll);
        };
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0 });

        setShowMobileMenu(false);
        setShowLogin(false);
        setShowSearch(false);
    }, [location]);

    useEffect(() => {
        if (mounted.current) {
            setFilter(location.state?.filter);
        }
    }, [location.state]);

    useEffect(() => {
        if (showMobileMenu) {
            mobileMenuRef.current?.focus();
        }

        return () => {};
    }, [showMobileMenu]);

    useEffect(() => {
        if (user) {
            setShowLogin(false);
        }

        mounted.current = true;
    }, [user]);

    const links = [
        { text: "Home", link: "/" },
        { text: "News", link: "/news" },
        { text: "Contact", link: "/contact" },
        { text: "Account", link: "/member" },
    ];

    function handleSearchChange(e) {
        setSearchValue(e.target.value);
    }

    function handleSearchSubmit(e) {
        e.preventDefault();

        navigate("/search", { state: searchValue });
    }

    function handleChange(e) {
        setForm((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }
    async function handleSubmit(e) {
        e.preventDefault();

        const token = await login("login", JSON.stringify(form));

        setToken(token);

        console.log(token);
    }

    return (
        <div className='App md:px-2 lg:px-16 2xl:px-32 px-60 bg-neutral-900 text-slate-50'>
            <header className='grid gap-4 md:sticky -top-8 bg-neutral-900 z-30 pb-4'>
                <nav className='grid md:gap-0 gap-4 md:relative'>
                    <ul className='flex justify-end gap-2'>
                        {[
                            {
                                icon: <AiFillFacebook size={30} />,
                                link: "https://www.facebook.com/",
                                title: "Facebook page",
                            },
                            {
                                icon: <AiFillTwitterSquare size={30} />,
                                link: "https://www.twitter.com/",
                                title: "Twitter page",
                            },
                            {
                                icon: <AiFillInstagram size={30} />,
                                link: "https://www.instagram.com/",
                                title: "Instagram page",
                            },
                            {
                                icon: <AiFillYoutube size={30} />,
                                link: "https://www.youtube.com/",
                                title: "Youtube channel",
                            },
                        ].map((item, i) => {
                            return (
                                <li key={i}>
                                    <a
                                        target='_blank'
                                        title={item.title}
                                        href={item.link}
                                    >
                                        {item.icon}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                    <section className='flex flex-wrap justify-between md:my-2 mb-4 relative'>
                        <Link to='/' className='text-2xl font-bold'>
                            <h1>MOVIE HUNTER</h1>
                        </Link>
                        <button
                            title='Show menu'
                            onClick={() => {
                                setShowMobileMenu((prev) => {
                                    setShowLogin(false);
                                    setShowSearch(false);
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
                                    <li className='text-center my-4' key={i}>
                                        <Link
                                            ref={
                                                i === 0
                                                    ? mobileMenuRef
                                                    : undefined
                                            }
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
                                    <li key={i} className='text-neutral-100 '>
                                        <Link
                                            className={
                                                filter === item.text
                                                    ? "text-orange-500"
                                                    : ""
                                            }
                                            to={"/"}
                                            state={{ filter: item.text }}
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
                        {user === undefined ? (
                            <form
                                onChange={handleChange}
                                onSubmit={handleSubmit}
                                className='flex flex-wrap gap-4 md:hidden'
                                action=''
                            >
                                <input
                                    type='text'
                                    placeholder='Username...'
                                    required
                                    name='username'
                                    aria-required
                                />
                                <input
                                    type='text'
                                    placeholder='Password...'
                                    name='password'
                                    required
                                    aria-required
                                />
                                <button className='px-4'>Login</button>

                                <Link to='/member'>Not a member?</Link>
                            </form>
                        ) : (
                            <article
                                className={
                                    (showSearchButton || window.innerWidth > 767
                                        ? "animate-fadefromtop "
                                        : "animate-fadetotop ") +
                                    "flex gap-2 items-center relative bg-neutral-800 rounded-md "
                                }
                            >
                                <h1 className=''>
                                    Hello{" "}
                                    <span>{user.alias || "Anonymous"}</span>{" "}
                                </h1>
                                <Link to='/member'>
                                    <AiOutlineUser size='36' />
                                </Link>
                                <button
                                    onClick={() => {
                                        const cookieEnabled =
                                            window.navigator.cookieEnabled;

                                        if (cookieEnabled) {
                                            window.localStorage.removeItem(
                                                "token"
                                            );
                                        }

                                        setUser();
                                    }}
                                >
                                    logout
                                </button>
                            </article>
                        )}
                        {showLogin ? (
                            <form
                                onChange={handleChange}
                                onSubmit={handleSubmit}
                                className='absolute w-fit right-0 top-full z-20 flex flex-wrap gap-4 h-fit bg-neutral-800  p-4'
                                action=''
                            >
                                <input
                                    autoFocus
                                    type='text'
                                    placeholder='Username...'
                                    required
                                    name='username'
                                />
                                <input
                                    type='text'
                                    placeholder='Password...'
                                    name='password'
                                    required
                                />
                                <button className='px-4'>Login</button>
                                <Link to='/member'>Not a member?</Link>
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
                                    className=''
                                    autoFocus
                                    value={searchValue}
                                    onChange={handleSearchChange}
                                />
                                <button>Search</button>
                            </form>
                        ) : null}

                        <button
                            title='Search'
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

                        {user === undefined ? (
                            <div>
                                <button
                                    title={
                                        (showLogin ? "Remove" : "Render") +
                                        " Login form"
                                    }
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
                            </div>
                        ) : null}
                    </section>
                </nav>
            </header>
            <main>
                <Outlet
                    context={{
                        searchValue: searchValue,
                        setSearchValue: setSearchValue,
                        filter: filter,
                    }}
                ></Outlet>
            </main>
            <footer>
                <section className='grid md:grid-cols-1 grid-cols-2 md:gap-16 gap-4'>
                    {news ? (
                        <ListArticle
                            list={news}
                            title='News'
                            emptyArrayMessage='No news currently'
                            itemBaseLink={"/news"}
                            linkState={{ prevPath: location.pathname }}
                            itemsBaseLink={"/news"}
                        />
                    ) : null}
                    {movies ? (
                        <ListArticle
                            list={movies.filter((movie) => {
                                return (
                                    +new Date(movie.releaseDate) > +new Date()
                                );
                            })}
                            title='Coming Soon'
                            emptyArrayMessage='No upcoming movies'
                            itemBaseLink='/movie'
                            itemsBaseLink='/upcoming-movies'
                            linkState={{ prevPath: location.pathname }}
                        />
                    ) : null}
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

                <section tabIndex='0' className='text-center mt-4'>
                    &copy;Movie Hunter ApS
                </section>
            </footer>
        </div>
    );
}

export default App;
