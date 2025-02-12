'use client';
import styles from './AboutUs.module.css';

export default function AboutUs() {
    return (
        <div className={styles.container}>
            <div className={styles.wrap}>
                <h1 className={styles.main_title}>About Me</h1>
                <p className={styles.text}>
                    Hi there! I'm a <span className={styles.highlight}>motivated and passionate Front-End Developer</span> who loves bringing ideas to life through code. As a beginner in the field, I am constantly striving to improve my skills and expand my knowledge. I enjoy solving problems, creating user-friendly interfaces, and making the web a more beautiful and accessible place.
                </p>
                <p className={styles.text}>
                    My journey in web development started with <strong>HTML, CSS, and JavaScript</strong>, and since then, I've been diving deeper into modern frameworks and tools to build more efficient and scalable applications. I believe that learning is a never-ending process, and I am always excited to explore new technologies and best practices.
                </p>

                <h2 className={styles.subtitle}>What I Love About Front-End Development</h2>
                <ul className={styles.list}>
                    <li>Turning designs into real, interactive experiences.</li>
                    <li>Working with modern frameworks to make applications dynamic.</li>
                    <li>Problem-solving and debugging – every challenge is a lesson.</li>
                    <li>Creating responsive and accessible websites for everyone.</li>
                    <li>Keeping up with trends and improving my coding skills daily.</li>
                </ul>

                <h2 className={styles.subtitle}>My Tech Stack</h2>
                <ul className={styles.stackList}>
                    <li><strong>HTML5, CSS3, SASS, Tailwind CSS</strong></li>
                    <li><strong>JavaScript, TypeScript</strong></li>
                    <li><strong>React, React Router, Next.js</strong></li>
                    <li><strong>MongoDB</strong></li>
                </ul>

                <h2 className={styles.subtitle}>My Goals and Aspirations</h2>
                <p className={styles.text}>
                    My main goal is to become a **professional Front-End Developer** who can build high-quality applications and contribute to meaningful projects. I am eager to collaborate with **experienced developers** and learn from their expertise. Eventually, I would love to explore **full-stack development** and gain more experience in **backend technologies**.
                </p>

                <h2 className={styles.subtitle}>My Projects</h2>
                <ul className={styles.projects}>
                    <li><strong>This Website</strong></li>
                    <li><a href='https://yakzh-next.vercel.app/' target="_blank" rel="noopener noreferrer" className={styles.link}>Project 2</a></li>
                </ul>
            </div>
        </div>
    );
}
