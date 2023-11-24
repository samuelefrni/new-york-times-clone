import React from 'react'
import logo from "../assets/new-york-times.svg"
import { Link } from 'react-router-dom'
import FooterCSS from "../CSSModule/Footer.module.css"

const Footer = () => {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }
    
    return (
        <>
            <footer className={FooterCSS.footer}>
                <img className={FooterCSS.img} src={logo} alt="New York Times" />
                <div>
                    <ul className={FooterCSS.containerDivGrid} onClick={scrollToTop}>
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
                </div>
                <hr />
                <p className={FooterCSS.p}>© Copyright 2023, Samuele Furnari</p>
            </footer>
        </>
    )
}

export default Footer