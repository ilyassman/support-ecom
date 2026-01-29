import './ProductCard.css';

interface ProductProps {
    image: string;
    title: string;
    description: string;
    price: string;
    originalPrice?: string;
    discount?: string;
}

const ProductCard=({image,title,description,price,originalPrice,discount}: ProductProps) => {
    return (
        <div className="product-card">
            <div className="product-image-container">
                {discount&&<span className="discount-tag">{discount}</span>}
                <img src={image} alt={title} className="product-image" />
                <button className="add-to-bag-btn">ADD TO BAG</button>
            </div>
            <div className="product-info">
                <h3>{title}</h3>
                <p className="product-desc">{description}</p>
                <div className="product-price">
                    <span className="current-price">{price}</span>
                    {originalPrice&&<span className="original-price">{originalPrice}</span>}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
