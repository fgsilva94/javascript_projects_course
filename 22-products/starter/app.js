const url = "https://course-api.com/javascript-store-products";

const productsDOM = document.querySelector(".products-center");

const fetchProducts = async () => {
  try {
    productsDOM.innerHTML = `<div class="loading"></div>`;

    const resp = await fetch(url);
    const data = await resp.json();

    return data;
  } catch (error) {
    productsDOM.innerHTML = `<p class="error">there was an error</p>`;
  }
};

const displayProducts = (list) => {
  const productList = list
    .map((product) => {
      const {
        id,
        fields: {
          name: title,
          price,
          image: [{ url: img }],
        },
      } = product;

      return `<a href="product.html?id=${id}" class="single-product">
            <img src="${img}" class="single-product-img img" alt="${title}" />
            <footer>
              <h5 class="name">${title}</h5>
              <span class="price">$${price / 100}</span>
            </footer>
          </a>`;
    })
    .join("");

  productsDOM.innerHTML = `<div class="products-container">
    ${productList}
  </div>`;
};

const start = async () => {
  const data = await fetchProducts();
  displayProducts(data);
};

start();
