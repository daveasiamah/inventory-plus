import React from 'react'

const Footer = () => {
    return (
        <footer className="footer footer-static footer-light navbar-border navbar-shadow">
            <div className="clearfix blue-grey lighten-2 text-sm-center mb-0 px-2">
                <span className="float-md-left d-block d-md-inline-block">2019 &copy; Copyright 
                <a className="text-bold-800 grey darken-2" href="https:/bluehive.com.ph.com" target="_blank">Bluehive Inc.</a></span>
                <ul className="list-inline float-md-right d-block d-md-inline-blockd-none d-lg-block mb-0">
                    <li className="list-inline-item"><a className="my-1" href="https://themeselection.com/" target="_blank"> More themes</a></li>
                    <li className="list-inline-item"><a className="my-1" href="https://themeselection.com/support" target="_blank"> Support</a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;
