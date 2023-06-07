import React from "react";

export default function FirstPage() {

    return (
        <div>
            <div className='m-1 w-100'>
                <a href="/pizzamenu" title="Meniu Pizza">
                   <img src='/pizza_menu2png.png' className="responsiveImg"></img> 
                </a>

                <a href="/drinks" title="Meniu bauturi">
                   <img src='/drinks.png' className="responsiveImg"></img> 
                </a>
                
            </div>
        </div>
    );
}
