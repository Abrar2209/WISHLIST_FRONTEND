//  localStorage.setItem("WishlistItems",JSON.stringify([]));
async function fetchWishlists() {
  try {
    const response = await fetch("http://localhost:3000/api/getWishlist");
    const data = await response.json();
    // console.log("DATA", data[0].wishlist_items);
    const wishlistItems = JSON.parse(data[0].wishlist_items);
    // checkSnippetPresence(wishlistItems);
    console.log("Wishlist Items", wishlistItems);
    // renderWishlist(wishlistItems);
    return wishlistItems;
  } catch (error) {
    console.log("ERROR", error);
    return [];
  }
}
console.log("Access hello", __st.cid);
const createWishlistPage = async () => {
  const pagecreated = localStorage.getItem("pagecreated");
  console.log(pagecreated)
  if(!pagecreated || pagecreated == null || pagecreated == undefined){
    console.log('INSIDE IF')
    const response = await fetch('http://localhost:3000/api/createPage')
    const data = await response.json();
    console.log('DATAT',data)
    if(data.pagecreated){
      localStorage.setItem("pagecreated",data.pagecreated);
    }else{
      localStorage.setItem("pagecreated",false);   
    }
  }else{
    console.log('page already created')
  }
};

createWishlistPage();

const addProductWishlist = async (productId) => {
      const requestBody = {
        productId,
        cid: __st.cid,
      };
      await fetch("http://localhost:3000/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then(async (response) => {
          const data = await response.json();
          console.log('data products',data)
          if (response.ok) {
            console.log("Wishlist items stored in the database successfully");
            alert(`Product adedddd to wishlist: ${data.product.title}`);
            renderWishlist();
            checkSnippetPresence();
          } else {
            console.error("Failed to store wishlist items in the database");
          }
        })
        .catch((error) => {
          console.error("Error storing wishlist items:", error);
        });
};

const removeProductFromWishlist = async (productId) => {
  var r = confirm('Are you sure want to delete this product?')
  if (r) {
    
    const requestBody = {
      productId,
      cid: __st.cid,
    };
    
    await fetch("http://localhost:3000/api/deletewishlistItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
    .then(async (response) => {
      const data = await response.json();
      console.log("response from dbs", data);
      
      if (response.ok) {
        console.log("Wishlist item removed from the database successfully");
        // Remove the product from the local wishlists array
        renderWishlist();
        checkSnippetPresence();
        // updatePage();
      } else {
        console.error("Failed to remove wishlist item from the database");
      }
    })
    .catch((error) => {
      console.error("Error removing wishlist item:", error);
    });
  } else {
   console.log('Sorry') 
  }
};

// let pageId = 120100356381;

function shareProduct(productTitle) {
  if (navigator.share) {
    navigator
      .share({
        title: "Check out this wishlist item!",
        text: `I wanted to share this product with you: ${productTitle} `,
        url: window.location.href,
      })
      .then(() => console.log("Product shared successfully."))
      .catch((error) => console.error("Error sharing product:", error));
  } else {
    console.log("Share API not supported.");
  }
}

async function createThemeTemplate() {
  const themetemplatecreated = localStorage.getItem("themetemplatecreated");
  console.log(themetemplatecreated)
  if(!themetemplatecreated || themetemplatecreated == null || themetemplatecreated == undefined){
    console.log('INSIDE IF')
    const response = await fetch('http://localhost:3000/api/createTemplate')
    const data = await response.json();
    console.log('DATAT',data)
    if(data.themetemplatecreated){
      localStorage.setItem("themetemplatecreated",data.themetemplatecreated);
    }else{
      localStorage.setItem("themetemplatecreated",false);   
    }
  }else{
    console.log('theme template already created')
  }
  
}

createThemeTemplate();
window.onload = function() {
  console.log('loaded');
  renderWishlist();
  checkSnippetPresence();
};


window.addEventListener("visibilitychange", function() {
  console.log("visibilitychangeed all");
  renderWishlist();
  checkSnippetPresence();
});
async function renderWishlist() {
  try {
    const wishlistItems = await fetchWishlists();
    console.log("ITTTEEEEMMMSSS", wishlistItems);
    let productListHTML = "";
    for (const product of wishlistItems) {
      productListHTML += `
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
          
          <div style="position: relative; margin: 10px;">
          ${
            product.variants[0].inventory_quantity != 0
              ? `<input type="checkbox" style="position:absolute;font-size:20px" class="checkbox-item"  data-product-id="${product.id}" 
            data-variant-id="${product.variants[0].id}"/>`
              : `<p></p>`
          }
            <button data-product-id="${
              product.id
            }" style="position: absolute; top: 0; right: 0;"
            onclick="removeProductFromWishlist(${product.id})">X</button>
            <a href="/products/${
              product.handle
            }" class="product-link" target="_blank">
            <img src="${
              product.image.src
            }" style="width: 200px; height: auto;" /><br/>
            <h2>${product.title}</h2>
            <br/>
            </a>
            <h3>${product.variants[0].price}</h3>
            <br/>
            ${
              product.variants[0].inventory_quantity == 0
                ? `<span style="color:red">OUT OF STOCK</span>`
                : `<button class="move-to-cart-button" data-product-title="${product.title}"
              onclick="addToCart(${product.variants[0].id}, '${product.id}')">Move to Cart</button>
              <span>IN STOCK</span>`
            }
            <button class="share-button" data-product-id="${
              product.id
            }" onclick="shareProduct('${product.title}')">
            <i class="fas fa-share"></i>
            </button>
          </div>`;
    }

    const wishlistContainer = document.getElementById("productContainer");
    wishlistContainer.innerHTML = productListHTML;
    
    console.log('CHECKLogffbbv');
    let checkboxes = document.querySelectorAll('.checkbox-item');
    // let selectAllCB = document.querySelectorAll('.select-all');
    // selectAllCB.addEventListener('change', togglemultiselectbuttons);
    console.log('CHECKBOXES',checkboxes);
    // Add event listeners to the checkboxes
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].addEventListener('change', togglemultiselectbuttons);
    }
  } catch (error) {
    console.error("Error fetching wishlist items:", error);
  }

}

const navigate = () => {
  // console.log('navigate')
  const wishlistPageUrl = "/pages/wishlist";
  window.location.href = wishlistPageUrl;
};

const checkSnippetPresence = async () => {
  const wishlists = await fetchWishlists();
  const snippets = document.querySelectorAll(".wishlist-engine");
  console.log(snippets);

  if (snippets.length > 0) {
   
    if (!__st.cid) {
    }
    fetch("http://localhost:3000/get-excluded-product-ids")
      .then((response) => response.json())
      .then((data) => {
        const excludedProductIdsa = data.productIDs;
        const excludedProductIds = JSON.parse(excludedProductIdsa);
        // console.log("excludeProducs", excludedProductIds);
        snippets.forEach((snippet) => {
          const productId = snippet.getAttribute("data-product_id"); // Retrieve the product ID
          // console.log("PRODUCT ID", productId);
          if (!excludedProductIds.includes(productId)) {
            snippet.innerHTML = `
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
              integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
            <div class="container">
              <!--<i class="fas fa-heart pulse"></i> -->
              <i class="far fa-heart js-heart heart"></i>
            </div>
          `;

            const heartDOM = snippet.querySelector(".js-heart");
            let liked = false;
            // console.log("LISTSrewewrrew", wishlists);
            wishlists.forEach((item) => {
              // console.log(item.id,parseInt(productId),item.id == parseInt(productId))
              if (item.id === parseInt(productId)) {
                liked = !liked;
                // console.log('Item Id',item.id)
                heartDOM.classList.remove("far");
                heartDOM.classList.add("fas", "pulse");
                // count+=1;
              }

            });
            console.log('LENGTHSS',wishlists.length)
            const wishlistCountDOM = document.querySelector(".wishlist-total-count");
    wishlistCountDOM.innerHTML = wishlists.length;
            heartDOM.onclick = (event) => {
              liked = !liked; // toggle the like (flipping the variable)

              const target = event.currentTarget;

              if (liked) {
                if (__st.cid) {
                  target.classList.remove("far");
                  target.classList.add("fas", "pulse");
                  count += 1;
                  // console.log('Product ID:', productId); // Log the product ID
                  // console.log('Count:', count);
                  // performFetch();
                  addProductWishlist(productId); // Fetch the product details
                  // createPage();
                } else {
                  alert("Login to add products in wishlist");
                  window.location.href = "/account/login";
                }
              } else {
                target.classList.remove("fas");
                target.classList.add("far");
                count -= 1;
                // console.log('Product ID:', productId); // Log the product ID
                console.log("Count:", count);
                // performFetch();
                removeProductFromWishlist(productId);
              }
            };

            heartDOM.addEventListener("animationend", (event) => {
              event.currentTarget.classList.remove("pulse");
            });
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

function toggleAllCheckboxes() {
  console.log('togggle')
  var selectAllCheckbox = document.getElementById('select-all-checkbox');
  var checkboxes = document.getElementsByClassName('checkbox-item');

  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = selectAllCheckbox.checked;
  }
  togglemultiselectbuttons()
}

function removeSelectedProducts() {
  console.log("Clickedsssssss")
  var checkboxes = document.getElementsByClassName('checkbox-item');
  console.log(checkboxes)
  var wishlistIdsToRemove = [];

  
  for (var i = 0; i < checkboxes.length; i++) {
    console.log(checkboxes[i].checked)
    if (checkboxes[i].checked) {
      const productId = checkboxes[i].getAttribute('data-product-id')
      console.log("IDSS",productId);
      // console.log("Product IDDD are",checkboxes[i].dataset.productId)
      wishlistIdsToRemove.push(productId);
    }
  }
  // Call a function to remove the wishlist items from the array
  console.log(wishlistIdsToRemove)
  removeWishlistItems(wishlistIdsToRemove);
}

async function removeWishlistItems(wishlistIds) {
  console.log('WISHLIST IDSssssssssss',wishlistIds)
  const requestBody = {
    productidstoremove: wishlistIds,
    cid: __st.cid,
  };
 const response = await fetch('http://localhost:3000/api/deleteAll',{
  method:'POST',
  headers: {
    "Content-Type": "application/json",
  },
  body:JSON.stringify(requestBody)
 });
 const data = await response.json();
 console.log(data)
 renderWishlist();
}    

function moveToCart() {
  var checkboxes = document.getElementsByClassName('checkbox-item');
  console.log(checkboxes)
  var wishlistIdsToMove = [];

  for (var i = 0; i < checkboxes.length; i++) {
    console.log(checkboxes[i].checked)
    if (checkboxes[i].checked) {
      const productId = checkboxes[i].getAttribute('data-product-id')
      const variantId = checkboxes[i].getAttribute('data-variant-id')
      console.log("IDSS",productId);
      // console.log("Product IDDD are",checkboxes[i].dataset.productId)
      wishlistIdsToMove.push({
        productId,variantId
      });
    }
  }

  // Call a function to move the wishlist items to the cart
  moveItemsToCart(wishlistIdsToMove);
}

async function moveItemsToCart(wishlistIds) {
  var r = confirm('Are you sure want to move this product to cart ')
  if (r) {
  try {
    for (var i = 0; i < wishlistIds.length; i++) {
      const productId = wishlistIds[i].productId;
      const variantId =  wishlistIds[i].variantId;
      console.log("P_ID", productId,variantId);
      if(productId && variantId){
        await addToCarts(variantId,productId);
      }
   }
   renderWishlist();
    // Render the updated cart here
  } catch (error) {
    console.error("Error adding products to cart:", error);
  }
}
else{
  console.log('NOT ADDED')
}
}

async function addToCart (variantId, productId) {
  // removeProductFromWishlist(productId);
  var r = confirm('Are you sure want to move to cart')
  if (r) {
    // alert('removed product');
    const quantity = 1;
    console.log(
      "Adding to cart: Variant ID",
      variantId,
      "Quantity:",
      quantity,
      "Product Id:",
      productId
      );
      
      const formData = {
        items: [
          {
            id: variantId,
            quantity: quantity,
          },
        ],
      };
      
      fetch(window.Shopify.routes.root + "cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Product added to cart:", data);
        removeProductFromWishlistOnMove(productId)
        renderWishlist();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }
  else{
    console.log('Not moved');
  }
};

async function removeProductFromWishlistOnMove (productId) {
    const requestBody = {
      productId,
      cid: __st.cid,
    };
    
    await fetch("http://localhost:3000/api/deletewishlistItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
    .then(async (response) => {
      const data = await response.json();
      console.log("response from dbs", data);
      
     
    })
    .catch((error) => {
      console.error("Error removing wishlist item:", error);
    });
 
};

async function addToCarts (variantId,productId){
  
  //  alert('removed product');
  const quantity = 1;
  console.log('Adding to cart: Variant ID', variantId, 'Product Id:',productId);
  
  const formData = {
    items: [
      {
        id: variantId,
        quantity: quantity,
      },
    ],
  };
  
  await fetch(window.Shopify.routes.root + 'cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log('Product added to cart:', data);
    removeProductFromWishlistOnMove(productId);
    // renderWishlist();
  })
  .catch((error) => {
    console.error('Error:', error);
    alert(error);
    });
}


//for showing movetocart and remove button
function togglemultiselectbuttons() {
  console.log('togglemultdffgdfgdsgdfgsdgsdgfg');
  let checkboxes = document.getElementsByClassName('checkbox-item');
  let checkboxcount = 0;
  
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkboxcount++;
    }
  }
  
  if (checkboxcount === 0) {
    var selectAllCheckbox = document.getElementById('select-all-checkbox');
    selectAllCheckbox.checked = false;
    let multiSelect = Array.from(document.getElementsByClassName('multiSelect'));
    console.log(multiSelect);
    multiSelect.forEach((item) => {
      item.style.display = "none";
    });
  } else {
    let multiSelect = Array.from(document.getElementsByClassName('multiSelect'));
    console.log(multiSelect);
    multiSelect.forEach((item) => {
      item.style.display = "block";
    });
  }
}

// window.addEventListener('load', function() {
//   console.log('CHECK');
//   let checkboxes = document.querySelectorAll('.checkbox-item.select-all');
//   console.log('CHECKBOXES',checkboxes);
//   // Add event listeners to the checkboxes
//   for (let i = 0; i < checkboxes.length; i++) {
//     checkboxes[i].addEventListener('change', togglemultiselectbuttons);
//   }
// });