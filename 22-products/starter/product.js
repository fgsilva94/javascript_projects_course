const url = "https://course-api.com/javascript-store-single-product";
const productDOM = document.querySelector(".product");

const fetchProduct = async () => {
  try {
    productDOM.innerHTML = `<h4 class="product-loading">Loading...</h4>`;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const resp = await fetch(`${url}?id=${id}`);
    const data = await resp.json();

    return data;
  } catch (error) {
    productDOM.innerHTML = `<p class="error">
      There was a problem loading the product. Please try again later
    </p>`;
  }
};

const displayProduct = async (product) => {
  console.log(product);
  const {
    fields: {
      name: title,
      company,
      colors,
      description,
      price,
      image: [{ url: img }],
    },
  } = product;

  document.title = title.toUpperCase();

  const colorsList = colors
    .map((color) => {
      return `<span class="product-color" style="background: ${color}"></span>`;
    })
    .join("");

  productDOM.innerHTML = `<div class="product-wrapper">
        <img src="${img}" alt="${title}" class="img" />
        <div class="product-info">
          <h3>${title}</h3>
          <h5>${company}</h5>
          <span>$${price / 100}</span>
          <div class="colors">${colorsList}</div>
          <p>${description}</p>
          <button class="btn">add to cart</button>
        </div>
      </div>`;
};

const start = async () => {
  const data = await fetchProduct();
  displayProduct(data);
};

start();
