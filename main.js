// Get form element
const productForm = document.getElementById("product-form");

// Submit form
productForm.addEventListener("submit", function (event) {
  event.preventDefault(); // prevent form from submitting

  // Get form data
  const formData = new FormData(event.target);

  // Do something with form data (e.g. send to server via AJAX)
  // console.log("Product Title:", formData.get("productTitle"));
  // console.log("Product Description:", formData.get("productDescription"));
  // console.log("Product Tags:", formData.get("productTags"));
  // console.log("Product Images:", formData.getAll("productImages[]"));
  // console.log("Product SKU:", formData.get("productSKU"));

  const body = {
    product: {
      title: formData.get("productTitle"),
      body_html: formData.get("productDescription"),
      tags: formData.get("productTags"),
      images: [],
      variants: [
        {
          sku: formData.get("productSKU"),
        },
      ],
    },
  };

  axios
    .post("http://localhost:5000", body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      const addedProduct = response.data;
      console.log(`POST: Product is added`, addedProduct);
      productForm.reset();
    })
    .catch((error) => console.error(error));
});
