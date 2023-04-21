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
  // formData.append("title", document.getElementById("product-title").value);
  // formData.append(
  //   "body_html",
  //   document.getElementById("product-description").value
  // );
  // formData.append("tags", document.getElementById("product-tags").value);
  // formData.append("images", document.getElementById("product-images").files[0]);
  // formData.append("variants", document.getElementById("product-sku").value);

  // console.log("formData", formData);
  // const body = {
  //   product: {
  //     title: formData.get("productTitle"),
  //     body_html: formData.get("productDescription"),
  //     tags: formData.get("productTags"),
  //     images: formData.getAll("productImages[]"),
  //     variants: [
  //       {
  //         sku: formData.get("productSKU"),
  //       },
  //     ],
  //   },
  // };
  // console.log("body", body);

  // axios
  //   .post("http://localhost:5000", formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   })
  //   .then((response) => {
  //     const addedProduct = response.data;
  //     console.log(`POST: Product is added`, addedProduct);
  //     productForm.reset();
  //   })
  //   .catch((error) => console.error(error));
});
