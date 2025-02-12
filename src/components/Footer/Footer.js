import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faTelegram } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from './Footer.module.css'



export default async function Footer() {
    return(
<footer className={styles.footer}>
    <div className='container'>
        <div className={styles.wrap}>
            <ul className={styles.socials}>
                <li>
                    <a href="https://www.linkedin.com/in/mikalai-yakzhyk-3208b033a">
                        <FontAwesomeIcon icon={faLinkedinIn} /> My Linkedin
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/yak.nikolas?igsh=MXd0M3dubHU4ZXh6cQ%3D%3D&utm_source=qr">
                        <FontAwesomeIcon icon={faInstagram} /> My instagram
                    </a>
                </li>
                <li>
                    <a href="https://t.me/Yak_Nik">
                        <FontAwesomeIcon icon={faTelegram} /> My Telegram
                    </a>
                </li>
            </ul>
            <div className={styles.info}>
                <h2 className={styles.title}>YakzhCafe</h2>
                <h3 className={styles.subtitle}>Created by Yak_Nik</h3>
            </div>
        </div>
    </div>
</footer>
    )
}