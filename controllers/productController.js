const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appErrors");
const Product = require("../models/productModel");
const { updateOne, deleteOne, getOne } = require("./handlerFactory");
const fs = require("fs");

const puppeteer = require("puppeteer");
const XLSX = require("xlsx");

exports.getAllProducts = catchAsync(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return new AppError("You are not the owner!!", 400);
  }
  const products = req.user.role === "admin" && (await Product.find({}));
  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  console.log(req.user);
  //Create new document, from body passed in the req.body
  const newDoc = await Product.create({ ...req.body, createdBy: req.user.id });
  // Document created successfully, send acknowledgement and the new document
  res.status(201).json({
    status: "success",
    data: {
      data: newDoc,
    },
  });
});
exports.updateProduct = updateOne(Product);
exports.deleteProduct = deleteOne(Product);
exports.getProductById = getOne(Product);

async function printPDF(currentUserId, role) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(
    `http://localhost:3000/products/pdf-view/${currentUserId}&${role}`,
    {
      waitUntil: "networkidle0",
    }
  );
  console.log("here");
  const pdf = await page.pdf({ format: "A4" });

  await browser.close();
  return pdf;
}

exports.getProductPDF = catchAsync(async (req, res, next) => {
  // console.log("getProductPDF",req.user.id);
  const pdf = await printPDF(req.user.id, req.user.role);
  res.set({ "Content-Type": "application/pdf", "Content-Length": pdf.length });
  res.setHeader("Content-Disposition", "attachment; filename=products.pdf");
  res.send(pdf);
});

async function populateXLSX(req) {
  const productBase = require("path").resolve(
    __dirname,
    "../docs/products-base.xlsx"
  );
  const products = require("path").resolve(__dirname, "../docs/products.xlsx");
  const workbook = await XLSX.readFile(productBase);
  const worksheets = {};

  for (const sheetName of workbook.SheetNames) {
    worksheets[sheetName] = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );
  }

  const productsData =
    req.user.role === "admin"
      ? await Product.find({}) // admin can view all the products created by all the users under them
      : await Product.find({ createdBy: req.user.id });

  if (productsData) {
    productsData.map((product) => {
      worksheets.Sheet1.push({
        ProductID: product._id.toString(),
        Name: product.name,
        Description: product.description,
        Price: product.price,
        CostPrice: product.costPrice,
        StockQuantity: product.stockQuantity,
        Images: product.photos
          .map((photo) => {
            return `http://${req.host}:${
              process.env.PORT || 3000
            }/img/${photo}`;
          })
          .join(" ; "),
      });
    });
  }
  //   console.log(productsData);
  XLSX.utils.sheet_add_json(workbook.Sheets["Sheet1"], worksheets.Sheet1);

  //   XLSX.writeFile(workbook, products);
  XLSX.writeFileXLSX(workbook, products, {});
}

exports.getXLSXData = catchAsync(async (req, res, next) => {
  //   console.log(require("path").resolve(__dirname, "../docs/products.xlsx"));
  await populateXLSX(req);
  const products = require("path").resolve(__dirname, "../docs/products.xlsx");
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=products.xlsx");
  const stream = fs.createReadStream(products); // create read stream
  // send attachment as response, (this will automatically trigger download)
  stream.pipe(res);
});

exports.getCSVData = catchAsync(async (req, res, next) => {
  const products = require("path").resolve(__dirname, "../docs/products.xlsx");
  const productsCSV = require("path").resolve(
    __dirname,
    "../docs/products-csv.csv"
  );
  await populateXLSX(req);
  const workBook = XLSX.readFile(products);
  XLSX.writeFile(workBook, productsCSV, { bookType: "csv" });
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=products-csv.csv");
  const stream = fs.createReadStream(productsCSV); // create read stream
  stream.pipe(res);
});
