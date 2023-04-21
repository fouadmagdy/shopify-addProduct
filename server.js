const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const apiKey = "78da25868017033fada453530792e367";
const password = "d90775dee09bfc7a068f36fe57f8c28d";
const shopName = "fouad-test-1925";
const accessToken = "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";

// Handle the form submission
app.post("/", function (req, res) {
  console.log("req", req.body);

  axios
    .post(
      `https://${apiKey}:${password}@${shopName}.myshopify.com/admin/api/2021-10/products.json`,
      req.body,
      {
        headers: {
          "content-type": "application/json",
          "X-Shopify-Access-Token": accessToken,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  // Send a response to the client
  res.send("Form submission successful");
});

// Start the server
app.listen(5000, function () {
  console.log("Server listening on port 5000");
});
