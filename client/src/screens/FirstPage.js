import React from 'react';
import '../Homepage.css'


function FirstPage() {
    return (
        <div className="homepage">
            <main>
                <section className="hero">
                    <h2>Pizza delicioasa facuta cu dragoste</h2>
                    <p>Descopera o varietate larga de pizza apetisante, pregatite cu ingrediente proaspete.</p>
                    <a href="/PizzaMenu" className="cta-button">Vezi Pizza</a>
                    <a href="/drinks" className="cta-button">Vezi bauturi</a>
                    <a href="/book" className="cta-button">Rezervari</a>
                </section>
                <section className="about">
                    <h2>Despre noi</h2>
                    <p>Suntem un restaurant dedicat pasionatilor de pizza, unde gasiti combinatii savuroase si arome autentice. 
                        Ne straduim sa oferim experienae gastronomice deosebite, cu pizza proaspata pregatita din ingrediente de calitate superioara. 
                        Echipa noastra de bucatari talentati pune pasiune si atentie in fiecare felie, oferindu-va gustul autentic al Italiei in fiecare muscatura.</p>
                    <p>Va invitam sa ne vizitati si sa va bucurati de o experienta culinara inconfundabila la restaurantul nostru cu pizza.</p>
                </section>
                <section className="contact">
                    <h2>Contact</h2>
                    <p>Strada Lalelelor nr.38</p>
                    <p>Oltenita, 915400</p>
                    <p>Telefon: +40 723 854 836</p>
                    <p>Email: adinu90@gmail.com</p>
                </section>
            </main>
            <footer className="footer">
                <p>&copy; 2023 Mizza Pizza. Toate drepturile rezervate.</p>
            </footer>
        </div>
    );
}

export default FirstPage;
