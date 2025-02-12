import AddToCartButton from "../AddToCartButton/AddToCartButton";
import styles from './MenuSection.module.css';



export default async function MenuCard() {
    const response = await fetch('api/menu', {
      cache: "no-store",
    });
  
    if (!response.ok) {
      console.error("Failed to fetch data");
      return <div>Failed to load menu.</div>;
    }
  
    const data = await response.json();
  
    return (
      <div className='container'>
        <h1 className={styles.menu_title}>Menu</h1>
        {data.map((category, categoryIndex) => (
          <div className={styles.card} key={categoryIndex} >
            <div className={styles.title_wrap}>
              <h2 className={styles.title}>{category.category}</h2>
            </div>
            <ul className={styles.list}>
              {category.items.map((item, itemIndex) => (
                <li className={styles.item} key={itemIndex}>
                  <p className={styles.name}>{item.name}</p>
                  <span className={styles.price}>${item.price}</span>
                  <AddToCartButton itemId={item.id} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
  