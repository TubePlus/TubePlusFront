'use client'
import { useState, useEffect } from 'react';
import style from './ScrollToTop.module.css'

function ScrollToTop() {

const [showButton, setShowButton] = useState(false);

const scrollToTop = () => {
    window.scroll({
        top: 0,
        behavior: 'smooth'
    })

}
useEffect(() => {
    const handleShowButton = () => {
        if (window.scrollY > 500) {
            setShowButton(true)
        } else {
            setShowButton(false)
        }
    }

    console.log(window.scrollY)
    window.addEventListener("scroll", handleShowButton)
    return () => {
        window.removeEventListener("scroll", handleShowButton)
    }
}, [])

return showButton && (
    <div className={style.scroll_container}>
        <button className={style.top} onClick={scrollToTop} type="button"> Top</button>
    </div>

)
}

export default ScrollToTop