import { useState, useEffect } from 'react'
import { CardProduct } from '../CardProduct/CardProduct'
import { useProductsStore } from '../../store/productsStore'
import { useAuthStore } from '../../store/authStore'
import { IconButton, InputLabel, MenuItem, Select  } from '@mui/material'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import styles from './styles/Products.module.css';

const Products = () => {

  const { filteredProducts, fetchProducts,setCurrency, actualCurrency} = useProductsStore()
  const {user}= useAuthStore()
  const productsPerPage = 8
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)


  useEffect(() => {
    fetchProducts()
  },[fetchProducts, actualCurrency])

  const allProducts = filteredProducts.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  )

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  useEffect(() => {
    setCurrentPage(0)
  }, [filteredProducts])

  const handleCurrencyChange=async(e)=>{
    await setCurrency(e.target.value)
    await fetchProducts()
    console.log('here', e.target.value)
  }

  return (
    <div className={styles.productsContain}>
      <div className={styles.paginationContain}>
      <InputLabel id="currencies">Currencies</InputLabel>
          <Select
                name="Currency"
                onChange={handleCurrencyChange}
                sx={{ color: '#bfbfbf' }}
          >
                <MenuItem value="EUR"id="EUR" >EUR</MenuItem>
                <MenuItem value={user?.ip_location?.currency} id={user?.ip_location?.currency} >{user?.ip_location?.currency}</MenuItem> 
                <MenuItem value="USD" id="USD" >USD</MenuItem>
          </Select>
        <IconButton
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          sx={{ color: '#bfbfbf' }}>
          <ArrowBackIosNew />
        </IconButton>
        <span>
          {currentPage + 1} / {totalPages}
        </span>
        <IconButton
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          sx={{ color: '#539a07' }}>
          <ArrowForwardIos />
        </IconButton>
      </div>

      <div className={styles.cardsContain}>
        {allProducts.map((product) => (
            <CardProduct
              product={product}
              className={styles.card}
              key={product.id_product}/>
        ))}
      </div>
    </div>
  )
}

export default Products

