import React, { useEffect, useState } from "react"
import { useHistory, Link } from "react-router-dom"

export const NavBar = () => {
    const history = useHistory()

    const [isOpen, setIsOpen] = useState(false);

    // useEffect(
    //     () => {
    //         getCustomer()
    //             .then((data) => {
    //                 const name = data.find((obj) => {
    //                     return obj
    //                 })
    //                 setCustomer(name)
    //             })
    //     },
    //     []
    // )


    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const logout = () => {
        localStorage.clear()
        history.push("/mainReact")
    }

    let darkMode = localStorage.getItem('darkMode')

    //check if dark mode is enabled
    //if enabled, turn it off
    //if enabled turn it onClick

    const enableDarkMode = () => {
        document.body.classList.add('darkmode');
        localStorage.setItem('darkMode', 'enabled')
    }

    const disableDarkMode = () => {
        document.body.classList.remove('darkmode');
        localStorage.setItem('darkMode', null)
    }

    if (darkMode === "enabled") {
        enableDarkMode();
    }

    const dark = () => {
        darkMode = localStorage.getItem("darkMode");
        console.log(darkMode)
        if (darkMode !== 'enabled') {
            enableDarkMode();
        }
    }

    const light = () => {
        darkMode = localStorage.getItem("darkMode");
        console.log(darkMode)
        if (darkMode == 'enabled') {
            disableDarkMode();
        }
    }

    const Popup = props => {
        return (
            <div className="popup-box">
                <div className="box">
                    <span className="close-icon" onClick={props.handleClose}></span>
                    {props.content}
                </div>
            </div>
        );
    };


    return (
        <article className="navbar">

            <section className="appLink" onClick={() => { history.push("/") }}>
                <h5 className="appName">
                    Career Connect
                </h5>
            </section>

            <div className="navType">
                <div><Link to={`/search`}>Search</Link></div>
                <div><Link to={`/post`}>Post</Link></div>
                <div><Link to={`/postings`}>Postings</Link></div>
                <div><Link to={`/applicants`}>Applicants</Link></div>
                <div><Link to={`/`}>Profile</Link></div>

            </div>



            <section className="listprofileLink">

                <input
                    className="react-switch-checkbox"
                    id={`react-switch-new`}
                    type="checkbox"
                    onClick={() => {
                        darkMode = localStorage.getItem("darkMode");
                        console.log(darkMode)
                        if (darkMode !== 'enabled') {
                            enableDarkMode();
                        } else {
                            disableDarkMode();
                        }
                    }}
                />
                <label
                    className="react-switch-label"
                    htmlFor={`react-switch-new`}
                >
                    <span className={`react-switch-button`} />
                </label>

                <button className="listprofileButton" onClick={() => { togglePopup() }}>
                    J
                </button>
                {isOpen && <Popup
                    content={<>
                        <p onClick={() => { logout() }}>LogOut</p>
                    </>}
                    handleClose={togglePopup}
                />}
            </section>

        </article>
    )
}