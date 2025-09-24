import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import QuantitySelector from "./components/quantityselector";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./reduxfeatures/productsslice/product-action";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { product: allProducts, loading, error } = useSelector((state) => state.products);


  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  useEffect(() => {
    if (allProducts.length > 0) {
      const uniqueCategories = ["All", ...new Set(allProducts.map((p) => p.category))];
      setCategories(uniqueCategories);
    }
  }, [allProducts]);


  useEffect(() => {
    let filtered = selectedCategory === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory);

    setTotalPages(Math.ceil(filtered.length / limit));

    const start = (page - 1) * limit;
    const end = start + limit;
    setFilteredProducts(filtered.slice(start, end));
  }, [allProducts, selectedCategory, page]);

  // Cart functions
  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added to cart!");
  };

  const handleViewCart = () => {
    navigate("/addtocart");
  };

  if (loading) return <p className="text-center mt-5">Loading products...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;

  return (
    <section className="products-page py-5" style={{ backgroundColor: "#fff5f5" }}>
      <div className="container">
        <h2 className="text-center mb-5 fw-bold" style={{ color: "#d6336c" }}>
          Products Collection
        </h2>


        <div className="mb-5 text-center d-flex justify-content-center">
          <select
            className="form-select w-auto"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(1);
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Products" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Product Cards */}
        <div className="row g-4">
          {filteredProducts.map((product) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={product.id}>
              <div className="card h-100 product-card shadow-sm border-0">
                <div className="overflow-hidden" style={{ height: "180px" }}>
                  <img
                    src={product.image}
                    className="card-img-top h-100 w-100 p-3"
                    alt={product.title}
                    style={{ objectFit: "contain", transition: "transform 0.3s" }}
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title fw-bold" style={{ minHeight: "50px" }}>
                    {product.title}
                  </h6>
                  <p className="text-muted small mb-1">
                    <strong>Category:</strong> {product.category}
                  </p>
                  <p className="fw-bold text-success mb-2">
                    ₹ {(product.price * 83).toFixed(2)}
                  </p>
                  <p className="small mb-3">{product.description.substring(0, 80)}...</p>

                  <QuantitySelector
                    initial={product.quantity || 1}
                    onChange={(newQty) => {

                      const updated = filteredProducts.map((p) =>
                        p.id === product.id ? { ...p, quantity: newQty } : p
                      );
                      setFilteredProducts(updated);
                    }}
                  />

                  <button
                    className="btn btn-danger mt-auto w-100 mb-2"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={handleViewCart}
                  >
                    View Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-center align-items-center gap-3 mt-5">
          <button
            onClick={() => { if (page > 1) setPage(page - 1); }}
            className="btn btn-outline-secondary"
          >
            ⬅ Prev
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            onClick={() => { if (page < totalPages) setPage(page + 1); }}
            className="btn btn-outline-secondary"
          >
            Next ➡
          </button>
        </div>
      </div>
    </section>
  );
}

export default Products;
