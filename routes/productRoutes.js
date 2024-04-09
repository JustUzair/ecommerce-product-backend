const router = require("express").Router();
const authController = require("../controllers/authController");
const productController = require("../controllers/productController");

router.use(
  // function checks if the user is logged in
  authController.protect,
  // function to check if the user is admin or creator/helper, if not restrict access
  authController.restrictTo("admin", "creator")
);

router.get("/get-pdf", productController.getProductPDF);
router.get("/get-xlsx", productController.getXLSXData);
router.get("/get-csv", productController.getCSVData);

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

router.post("/", productController.createProduct);
router.patch("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
