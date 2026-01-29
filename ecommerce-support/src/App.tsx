import {motion} from 'framer-motion';
import ChatWidget from './components/ChatWidget';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import './App.css';

const products=[
  {
    id: 1,
    title: "ULTIMATE STYLER",
    description: "Multi-styler and dryer 5 in 1",
    price: "$69.90",
    originalPrice: "$225.00",
    discount: "-70%",
    image: "/ultimate_styler.png"
  },
  {
    id: 2,
    title: "NOMAD PRO",
    description: "Ultra-light portable styler",
    price: "$49.90",
    originalPrice: "$164.00",
    discount: "-70%",
    image: "/nomad_pro.png"
  },
  {
    id: 3,
    title: "SCALP THERAPY II",
    description: "Red light scalp massager",
    price: "$79.90",
    image: "/scalp_therapy_ii.png"
  },
  {
    id: 4,
    title: "SCALP THERAPY",
    description: "Red light vibrating scalp massager",
    price: "$64.90",
    image: "/scalp_therapy.png"
  }
];

function App() {
  return (
    <>
      <Navbar />

      <main className="main-content">
        <section className="hero-container">
          <motion.div
            className="hero-banner"
            initial={{opacity: 0,scale: 0.98}}
            animate={{opacity: 1,scale: 1}}
            transition={{duration: 0.8}}
          >
            <div className="hero-overlay">
              <span className="subtitle">JOIN THE EXPERIENCE</span>
              <h1>Revitalize your <br /> hair routine</h1>
              <div className="bottom-bar">
                <span>ELEVATE YOUR HAIR GAME <br /> EFFORTLESSLY</span>
                <button className="shop-btn">SHOP NOW</button>
              </div>
            </div>
            <img src="https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=2600&auto=format&fit=crop" alt="Hero" className="hero-img" />
          </motion.div>
        </section>

        <section className="products-section">
          <div className="section-header">
            <h2>BEST SELLERS</h2>
          </div>

          <div className="products-grid">
            {products.map((product,index) => (
              <motion.div
                key={product.id}
                initial={{opacity: 0,y: 30}}
                animate={{opacity: 1,y: 0}}
                transition={{delay: index*0.1+0.3}}
              >
                <ProductCard
                  title={product.title}
                  description={product.description}
                  image={product.image}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  discount={product.discount}
                />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="featured-section">
          {/* Placeholder for future ACES section if needed */}
        </section>
      </main>

      <ChatWidget />
    </>
  )
}

export default App
