import express from "express";
import connectToDatabase from "./connection.js";
import bodyParser from "body-parser";
import cors from "cors";
import Product from "./product.model.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000

connectToDatabase();

// const newUser = new Product({
//     serialNumber: "123456",
//     umei_1: "123456789012345",
//     umei_2: "987654321012345",
//     sku: "SKU123"
// });

// const newUser2 = new Product({
//   serialNumber: "789012",
//   umei_1: "987654321098765",
//   umei_2: "123456789098765",
//   sku: "SKU456"
// });

// const newUser3 = new Product({
//   serialNumber: "345678",
//   umei_1: "654321098765432",
//   umei_2: "567890123456789",
//   sku: "SKU789"
// });

// const newUser4 = new Product({
//   serialNumber: "987654",
//   umei_1: "12345672139012345",
//   umei_2: "234567890123456",
//   sku: "SKU543"
// });

// newUser.save();
// newUser2.save();
// newUser3.save();
// newUser4.save();

app.post('/product/serial-number', async(req, res) => {
    const { serialNumberInput } = req.body;

    const prod = await Product.find({ serialNumber: serialNumberInput }) 

    if (prod.length === 0) {
      return res.status(404).json({message: "No product found!"});
    }
    return res.status(200).json({ product: prod});
});

app.post('/product/sku', async(req, res) => {
  const { sku } = req.body;

  const prod = await Product.find({ sku })


  if (prod.length === 0) {
    return res.status(404).json({message: "No product found!"});
  }
  return res.status(200).json({ product: prod});
});


app.listen(port, () => {
  console.log(`Server is running at ${port}`)
})