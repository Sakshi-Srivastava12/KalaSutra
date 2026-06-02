import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

import ArtGallery from "../components/ArtGallery";
import FeaturedArt from "../components/FeaturedArt";
import TopArtists from "../components/TopArtists";
import ProductGrid from "../components/ProductGrid";


function Home() {

    const navigate = useNavigate();

    return (

        <div>

            {/* HERO SECTION */}

            <div className="home-container">

                {/* FLOATING BUBBLES */}

                <div className="art-bubbles">

                    <div className="bubble big">
                        <img src="/images/g.png" alt="art"/>
                    </div>

                    <div className="bubble medium">
                        <img src="/images/f.png" alt="art"/>
                    </div>

                    <div className="bubble small">
                        <img src="/images/e.png" alt="art"/>
                    </div>

                    <div className="bubble medium bubble2">
                        <img src="/images/d.png" alt="art"/>
                    </div>

                    <div className="bubble big bubble3">
                        <img src="/images/c.png" alt="art"/>
                    </div>

                    <div className="bubble small bubble6">
                        <img src="/images/b.png" alt="art"/>
                    </div>

                    <div className="bubble medium bubble7">
                        <img src="/images/brush.png" alt="art"/>
                    </div>

                    <div className="bubble big bubble8">
                        <img src="/images/h.png" alt="art"/>
                    </div>

                    <div className="bubble medium bubble9">
                        <img src="/images/paint.png" alt="art"/>
                    </div>

                    <div className="bubble small bubble10">
                        <img src="/images/a.png" alt="art"/>
                    </div>

                </div>

                {/* HERO TEXT */}

                <div className="hero-section">

                    <h1>Welcome to KalaSutra</h1>

                    <p>
                        Discover handmade art and beautiful creations from talented artists.
                    </p>

                    <div className="hero-buttons">

                        <button onClick={() => navigate("/videos")}>
                            Explore Art
                        </button>

                        <button>
                            Sell Your Art
                        </button>

                    </div>

                </div>

            </div>

            {/* OTHER SECTIONS */}

            <ArtGallery />

            <FeaturedArt />

            <TopArtists />

            <ProductGrid />

        </div>

    );
}

export default Home;