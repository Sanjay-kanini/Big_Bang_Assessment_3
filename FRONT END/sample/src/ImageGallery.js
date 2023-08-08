import React from 'react';

const ImageGallery = ({ images }) => {
    return (
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Image ${index}`}
                    style={{ width: "48%", marginBottom: "10px" }}
                />
            ))}
        </div>
    );
};

export default ImageGallery;
