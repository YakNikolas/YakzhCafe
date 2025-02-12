import Link from "next/link";
import styles from './mainpage.module.css'
import MenuCard from "@/components/MenuSection/MenuSection";


export default async function Home() {
  return (
    <>
    <section>
        <div className={styles.main}>
          <div className={styles.wrap}>
            <h2 className={styles.subtitle}>Welcome to</h2>
            <h1 className={styles.title}>YakzhCafe</h1>
          </div>
      </div>
    </section>
    <section>
      <MenuCard></MenuCard>
    </section>
    </>
  );
}
