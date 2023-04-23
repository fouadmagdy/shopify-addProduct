const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const app = express();
const multer = require("multer");
const Shopify = require("shopify-api-node");
const fs = require("fs");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./"));

const port = process.env.PORT || 5000;

const upload = multer({ dest: "upload" });

const apiKey = process.env.APIKEY;
const password = process.env.PASSWORD;
const shopName = process.env.SHOPNAME;
const accessToken = process.env.ACCESSTOKEN;

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

// Route for the homepage
app.get("/", (req, res) => {
  // Send the index.html file
  res.sendFile("index.html");
});

// Handle the form submission
app.post("/create", upload.array("images"), function (req, res) {
  const product = {
    product: {
      title: req.body.title,
      body_html: req.body.body_html,
      tags: req.body.tags,
      images: req.file,
      variants: [
        {
          sku: req.body.variants,
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
app.listen(port, function () {
  console.log(`Server listening on ${port}`);
});
