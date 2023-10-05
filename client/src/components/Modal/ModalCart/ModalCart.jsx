import styles from '../ModalCart/ModelCart.module.css'
import { CardProductMiniCart } from "../../CardProductMiniCart/CardProductMiniCart"
import Button from '@mui/material/Button';
import { isMobile } from 'react-device-detect';

export const ModalCart = ({products, toggleDrawer}) => {
  return (
    <>
      <div className={styles.container}>
      {isMobile ? <button onClick={toggleDrawer}>back</button> : null}
      <h1 className={styles.title}>Your cart</h1>
      <p className={styles.subtitle}>Total: $0.00</p>
      
      <section className={styles.cardProductContain}>
        {products.map((product) => (
          <div key={product.id_product} className={styles.main}>
             <CardProductMiniCart  product={product} />
          </div>
        ))}
      </section>
      <section>
        <Button
        variant='contained'
        sx={{margin: '1rem', size: 'large', backgroundColor: '#010402'}}
        >GO TO PAY</Button>
      </section>
    </div>
    </>
  )
}

