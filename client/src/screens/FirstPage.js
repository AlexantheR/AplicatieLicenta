import React from "react";

export default function FirstPage() {

    return (
        <div>
            <div className='m-1 w-100'>
                <a href="/pizzamenu" title="Pizza menu">
                   <img src='/pizza_menu2png.png' className="responsiveImg"></img> 
                </a>

                <a href="/drinks" title="Drinks menu">
                   <img src='/drinks.png' className="responsiveImg"></img> 
                </a>
                
            </div>
        </div>
    );
}
