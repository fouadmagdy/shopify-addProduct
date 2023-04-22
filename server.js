const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();
const multer = require("multer");
const Shopify = require("shopify-api-node");
const fs = require("fs");

app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static("./"));

const upload = multer({ dest: "upload" });

const apiKey = "78da25868017033fada453530792e367";
const password = "d90775dee09bfc7a068f36fe57f8c28d";
const shopName = "fouad-test-1925";
const accessToken = "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";

const shopify = new Shopify({
  shopName: shopName,
  apiKey: apiKey,
  password: accessToken,
  apiVersion: "2021-10",
});

async function uploadImage(productId, fileObj) {
  const { filename, path } = await fileObj;
  const file = fs.readFileSync(path);
  const base64File = Buffer.from(file).toString("base64");

  try {
    await shopify.productImage.create(productId, {
      attachment: base64File,
      filename: filename,
    });
  } catch (err) {
    console.log("err", err);
  }
}

// Handle the form submission
app.post("/", upload.array("images"), function (req, res) {
  const product = {
    product: {
      title: req.body.title,
      body_html: req.body.body_html,
      tags: req.body.tags,
      images: req.file,
      variants: [
        {
          sku: req.body.sku,
        },
      ],
    },
  };

  axios
    .post(
      `https://${apiKey}:${password}@${shopName}.myshopify.com/admin/api/2021-10/products.json`,
      product,
      {
        headers: {
          "content-type": "application/json",
          "X-Shopify-Access-Token": accessToken,
        },
      }
    )
    .then((response) => {
      if (!response) return;
      req.files.forEach((file) => {
        uploadImage(response.data.product.id, file);
      });
      res.redirect("/thank-you.html");
    })
    .catch((error) => {
      console.error(error);
    });
});

// Start the server
app.listen(5000, function () {
  console.log("Server listening on port 5000");
});
