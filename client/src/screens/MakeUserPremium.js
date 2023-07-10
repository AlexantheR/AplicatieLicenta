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
                        <PremiumCheckout onPremiumStatusChange={handleUpdatePremiumStatus} />
                    </div>
                )}
            </div>
        </div>
    );
}
