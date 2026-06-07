import React from "react";

function FeaturedArt(){

    return(

        <section className="featured-section">

            <h2>Featured Artworks</h2>

            <div className="featured-grid">

                <div className="art-card">
                    <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f"/>
                    <p>Modern Abstract</p>
                </div>

                <div className="art-card">
                    <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"/>
                    <p>Colorful Painting</p>
                </div>

                <div className="art-card">
                    <img src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb"/>
                    <p>Creative Artwork</p>
                </div>

            </div>

        </section>

    );

}

export default FeaturedArt;