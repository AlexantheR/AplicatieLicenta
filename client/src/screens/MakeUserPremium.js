import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PremiumCheckout from '../components/PremiumCheckout';
import { loseUserPremium, updateUserPremiumStatus } from '../actions/userActions';

export default function Makeuserpremium() {
    AOS.init();

    const userState = useSelector(state => state.loginUserReducer);
    const { currentUser } = userState;
    const dispatch = useDispatch();

    const handleUnsubscribe = async () => {
        try {
            if (window.confirm('Sigur doriti sa va dezabonati?')) {
                dispatch(loseUserPremium(currentUser.email));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (currentUser) {
            if (currentUser.isPremium) {
                // Perform any necessary actions when the user becomes premium
                console.log('User is premium');
            } else {
                // Perform any necessary actions when the user loses premium status
                console.log('User is not premium');
            }
        }
    }, [currentUser]);

    const handleUpdatePremiumStatus = (isPremium) => {
        const updatedUser = { ...currentUser, isPremium };
        dispatch(updateUserPremiumStatus(updatedUser));
    };

    return (
        <div>
            <div className='row justify-content-center p-2' data-aos='fade-down'>
                {currentUser?.isPremium ? (
                    <div>
                        <h2>Sunteti deja client premium, doriti sa va dezabonati?</h2>
                        <button className="book-table-btn" onClick={handleUnsubscribe}>
                            Dezabonare de la Premium
                        </button>
                    </div>
                ) : (
                    <div className='col-md-4'>
                        <h2>Deveniti client premium</h2>
                        <div className='motiv-premium'>
                            <h1>Iti multumim pentru fidelitatea ta si pentru ca alegi mereu pizza noastra delicioasa. Suntem incantati sa-ti prezentam o oferta speciala care te va face sa te simti cu adevarat privilegiat - devenind client premium si beneficiind de reduceri exclusive.</h1>
                            <h1>Cu doar <b>25 RON</b> pe luna, poti sa-ti cumperi abonamentul premium si sa primesti o <b>reducere de 10%</b> la fiecare comanda de pizza mare. In plus, prin achizitionarea abonamentului premium, sustii si dezvoltarea noastra ca brand. Ne ajuta sa investim in ingrediente de calitate superioara, sa mentinem un nivel ridicat de servicii si sa inovam constant pentru a-ti oferi experiente culinare extraordinare.</h1>
                            <h1>Asadar, nu mai sta pe ganduri! Alege sa devii client premium si bucura-te de avantajele pe care ti le oferim. Incepe sa economisesti si sa te rasfeti cu pizza noastra delicioasa in fiecare luna. Cu fiecare comanda, vei simti ca alegerea ta este mai mult decat o reducere - este o recompensa pentru gusturile tale rafinate.</h1>
                        </div>
                        <p style={{ textAlign: 'justify', fontStyle: 'italic', paddingTop:'3px' }}>*Dorim sa-ti aducem la cunostinta ca ne rezervam dreptul de a revoca statusul de client premium in anumite cazuri, in conformitate cu termenii si conditiile noastre. Aceasta poate interveni in situatii in care exista abuz sau incalcari ale politicilor noastre de utilizare sau comportament nerespectuos fata de angajatii nostri.</p>
                        <PremiumCheckout onPremiumStatusChange={handleUpdatePremiumStatus} />
                    </div>
                )}
            </div>
        </div>
    );
}
