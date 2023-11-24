import React, { useState } from 'react'
import { IoMdMenu } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import logo from "../assets/new-york-times.svg"
import Search from '../pages/Search';
import NavbarCSS from "../CSSModule/Navbar.module.css"

const Navbar = () => {
    const date = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);

    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [query, setQuery] = useState();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleClick = () => {
        setIsOpen((prevState) => !prevState)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input == "") return
        setQuery(input);
        setIsOpen(false);
        navigate(`/search/${input}`);
    }

    return (
        <>
            <nav className={NavbarCSS.nav}>
                <CiSearch className={isOpen ? NavbarCSS.iconClose : NavbarCSS.searchIcon} onClick={handleClick} />
                <IoMdMenu className={isOpen ? NavbarCSS.iconClose : NavbarCSS.menuIcon} onClick={handleClick} />
                {
                    isOpen ? <IoIosClose
                        className={NavbarCSS.closeIcon}
                        onClick={() => setIsOpen(false)}
                    /> : null
                }
                <img className={NavbarCSS.img} src={logo} alt="New York Times" />
                <FaUser className={NavbarCSS.userIcon} />
            </nav>
            <header className={NavbarCSS.header}>
                <p className={NavbarCSS.p}>{formattedDate}</p>
                <ul className={NavbarCSS.ulNav}>
                    <Link to="/">
                        <li>Home</li>
                    </Link>
                    <Link to="/section/world">
                        <li>World</li>
                    </Link>
                    <Link to="/section/us">
                        <li>US</li>
                    </Link>
                    <Link to="/section/nyregion">
                        <li>NY</li>
                    </Link>
                    <Link to="/section/politics">
                        <li>Politics</li>
                    </Link>
                    <Link to="/section/business">
                        <li>Business</li>
                    </Link>
                    <Link to="/section/opinion">
                        <li>Opinion</li>
                    </Link>
                    <Link to="/section/science">
                        <li>Science</li>
                    </Link>
                    <Link to="/section/arts">
                        <li>Arts</li>
                    </Link>
                    <Link to="/section/books">
                        <li>Books</li>
                    </Link>
                    <Link to="/section/movies">
                        <li>Movies</li>
                    </Link>
                    <Link to="/section/food">
                        <li>Food</li>
                    </Link>
                    <Link to="/section/travel">
                        <li>Travel</li>
                    </Link>
                    <Link to="/section/magazine">
                        <li>Magazine</li>
                    </Link>
                    <Link to="/section/technology">
                        <li>Technology</li>
                    </Link>
                </ul>
            </header>
            <form onSubmit={handleSubmit} className={isOpen ? NavbarCSS.form : NavbarCSS.isClose}>
                <input
                    className={NavbarCSS.input}
                    type="text"
                    placeholder='Search'
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                />
                <button className={NavbarCSS.button}>Go</button>
                <ul className={NavbarCSS.ulForm} onClick={() => setIsOpen(false)}>
                    <Link to="/">
                        <li>Home</li>
                    </Link>
                    <Link to="/section/world">
                        <li>World</li>
                    </Link>
                    <Link to="/section/us">
                        <li>US</li>
                    </Link>
                    <Link to="/section/nyregion">
                        <li>NY</li>
                    </Link>
                    <Link to="/section/politics">
                        <li>Politics</li>
                    </Link>
                    <Link to="/section/business">
                        <li>Business</li>
                    </Link>
                    <Link to="/section/opinion">
                        <li>Opinion</li>
                    </Link>
                    <Link to="/section/science">
                        <li>Science</li>
                    </Link>
                    <Link to="/section/arts">
                        <li>Arts</li>
                    </Link>
                    <Link to="/section/books">
                        <li>Books</li>
                    </Link>
                    <Link to="/section/movies">
                        <li>Movies</li>
                    </Link>
                    <Link to="/section/food">
                        <li>Food</li>
                    </Link>
                    <Link to="/section/travel">
                        <li>Travel</li>
                    </Link>
                    <Link to="/section/magazine">
                        <li>Magazine</li>
                    </Link>
                    <Link to="/section/technology">
                        <li>Technology</li>
                    </Link>
                </ul>
            </form >
            {
                pathname === "/" || pathname.slice(0, 8) === "/section" ?
                    null : <>
                        <section className={NavbarCSS.section}>
                            <span>Resuts for:</span>
                            <p className={NavbarCSS.queryResult}>{query}</p>
                            <hr />
                        </section>
                        <Search query={query} />
                    </>

            }
        </>
    )
}

export default Navbar


