import React from "react";

function TopArtists(){

    return(

        <section className="artists-section">

            <h2>Top Artists</h2>

            <div className="artists-grid">

                <div className="artist-card">
                    <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="Artist" />
                    <p>Sophia Art</p>
                </div>

                <div className="artist-card">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Artist" />
                    <p>David Painter</p>
                </div>

                <div className="artist-card">
                    <img src="https://randomuser.me/api/portraits/women/50.jpg" alt="Artist" />
                    <p>Emily Design</p>
                </div>

            </div>

        </section>

    );

}

export default TopArtists;