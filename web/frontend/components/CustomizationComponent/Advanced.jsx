import React, { useState, useEffect,useRef} from 'react';
import { FaHeart } from 'react-icons/fa';
import { useAppQuery, useAuthenticatedFetch } from '../../hooks';

const AdvancedSettings = () => {
  const [wishlistType, setWishlistType] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productIDs, setProductIDs] = useState([]);
  const RFB_BASE_URL = 'http://localhost:8080';
  const fetch = useAuthenticatedFetch();
  const [hasSnippet, setHasSnippet] = useState(false);
  useEffect(() => {
    fetchProducts();
    const checkSnippetPresence = () => {
        const snippets = document.querySelectorAll(".wishlist-engine");
        if (snippets.length > 0) {
          setHasSnippet(true);
        }
      };
  
      checkSnippetPresence();
  }, []);
  useEffect(() => {
    if (productIDs.length > 0) {
      fetch('http://localhost:3000/exclude-product-ids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productIDs }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error('Error sending product IDs:', error);
        });
    }
  }, [productIDs]);
  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/products`);
      const products = await response.json();
      setProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleWishlistTypeChange = (e) => {
    const value = e.target.value;
    setWishlistType(value);
  };

  const handleProductSelect = (e) => {
    const selectedProductId = e.target.value;
    const selectedProduct = products.find((product) => product.id == selectedProductId);
    setSelectedProducts([...selectedProducts, selectedProduct]);
    setProducts(products.filter((product) => product.id != selectedProductId));
    setProductIDs((prevProductIDs) => [...prevProductIDs, selectedProductId]);  
    console.log("ID",e.target.value)
    console.log(products)
    // e.target.value="";
  
  };
  
  const handleProductDelete = (productId) => {
    const deletedProduct = selectedProducts.find((product) => product.id === productId);
    setProducts([...products, deletedProduct]);
    setSelectedProducts(selectedProducts.filter((product) => product.id !== productId));
  };
  const inputRef = useRef(null);
  const [buttonVisible, setButtonVisible] = useState(false);

  const handleCopyClick = () => {
    if (inputRef.current) {
      inputRef.current.select();
      navigator.clipboard.writeText(inputRef.current.value)
        .then(() => {
          console.log('Text copied to clipboard');
          setButtonVisible(true); // Show the button after the code is copied
        })
        .catch((error) => {
          console.error('Failed to copy text:', error);
        });
    }
  };
  console.log(productIDs)
  return (
    <>
      <div>Advanced Settings</div>
      <div className="checkbox-check-inputs">
        <label>
          <input
            type="radio"
            className="checkbox-input"
            onChange={handleWishlistTypeChange}
            value="all"
            checked={wishlistType === 'all'}
          />
          <span>Wishlist for all Items</span>
        </label>
      </div>
      <div className="checkbox-check-inputs">
        <label>
          <input
            type="radio"
            className="checkbox-input"
            onChange={handleWishlistTypeChange}
            value="excluding"
            checked={wishlistType === 'excluding'}
          />
          <span>Wishlist Excluding some products</span>
        </label>
      </div>
      {wishlistType === 'excluding' && (
        <>
          <div className="dropdown">
            <div className="header">Select Fields to exclude</div>
            <select style={{ width: '100%', fontSize: '15px' }} onChange={handleProductSelect}>
              <option value="">Select a Product</option>
              {products.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div className="selected-products">
            {selectedProducts.map((product) => (
              <div key={product.id}>
                <span>{product.title}</span>
                <button onClick={() => handleProductDelete(product.id)}>Delete</button>
              </div>
            ))}
          </div>
        </>
      )}
       <div>
      <label>Copy Code Snippet</label>
      <input
        ref={inputRef}
        type="text"
        value="<div class='wishlist-engine' data-product_handle='{{ card_product.id }}' data-variant_id='{{ product.selected_or_first_available_variant.id }}' data-full_button='true' data-css='true'></div>"
        disabled={true}
        style={{ fontSize: 15, width: '100%' }}
      />
      <a href="#" onClick={handleCopyClick}>Copy</a>
      <div>
      {hasSnippet && <FaHeart size={24} color="red" 
      style={{padding:5,fontSize:15,background:'gold',color:'#000000',cursor:'pointer'}}/>}
    </div>
    </div>
    <div class='wishlist-engine' data-product_id='{{ product.id }}' 
    data-variant_id='{{ product.selected_or_first_available_variant.id }}'
     data-full_button='true' data-css='true'></div>
    </>
  );
};

export default AdvancedSettings;
