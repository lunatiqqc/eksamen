import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";

function App() {
    return (
        <div className='App px-16 bg-neutral-900 text-slate-50'>
            <header>
                <nav className='flex justify-between'>
                    <Link to='/'>
                        <h1>MOVIE HUNTER</h1>
                    </Link>

                    <ul className='flex gap-4'>
                        {[
                            { text: "Home", link: "/" },
                            { text: "News", link: "/news" },
                            { text: "Contant", link: "/contact" },
                        ].map((item) => {
                            return (
                                <li>
                                    <Link to={item.link}>{item.text}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
            <footer>footer</footer>
        </div>
    );
}

export default App;
