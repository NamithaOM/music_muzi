import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Home.css';
import Head from './Head';

function Payment() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("userdata")));

  const [shoe] = useState({
    name: "MUzi",
    img: "https://www.bing.com/images/search?view=detailV2&ccid=SUZGNomi&id=CC8CF7497058C70CFEE1E504C04CEB490E4AE9D0&thid=OIP.SUZGNomirKW3Y8rZ2S25NwHaEK&mediaurl=https%3A%2F%2Ffscl01.fonpit.de%2Fuserfiles%2F6727621%2Fimage%2F2016%2FHeroS-random%2FAndroidPIT-BEST-MUSIC-APPS.jpg&exph=979&expw=1741&q=muzic+app&simid=608006111103373825&FORM=IRPRST&ck=6B25B151346709CAAB022BE4CA90FDB6&selectedIndex=5&itb=0&cw=1375&ch=666&ajaxhist=0&ajaxserp=0",
    price: 500,
  });

  const handlePay = async () => {
    try {
      // Create an order on the server
      const orderResponse = await axios.post('http://localhost:3005/user/orders', {
        amount: shoe.price
      });

      const orderData = orderResponse.data.data;

      const options = {
        key: 'rzp_test_4Ex6Tyjkp79GFy', // Replace with your Razorpay public key
        amount: orderData.amount,
        currency: orderData.currency,
        name: shoe.name,
        description: 'Test Payment',
        image: shoe.img,
        order_id: orderData.id,
        handler: function (response) {
          // Verify the payment on the server
          axios.post('http://localhost:3005/user/verify', { 
            razorpay_order_id: response.razorpay_order_id, 
            razorpay_payment_id: response.razorpay_payment_id, 
            razorpay_signature: response.razorpay_signature,
            id: auth._id // Use the actual user ID from auth state
          })
          .then(verificationResponse => {
            console.log(verificationResponse.data);
            if (verificationResponse.data.message === "Payment verified and status updated successfully") {
              alert('Payment status updated successfully');
              // You can navigate to a success page or show a success message
              navigate('/');
            }
          })
          .catch(error => {
            console.error('Error in payment verification:', error);
          });
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error in handlePay:', error);
    }
  };



  return (
    <>
      <Head/>
      <div className="App">
        <div className="shoe_container">
          <video autoPlay muted loop id="bg-video" style={{ width: "500px", height: "300px", marginTop: "150px" }}>
            <source src="/img/artist.mp4" type="video/mp4" />
          </video>
          <h1 className="shoe_name" style={{ color: "wheat" }}>{shoe.name}</h1>
          <h3 className="shoe_price" style={{ color: "wheat" }}>Monthly Premium: {shoe.price}</h3>
          <button onClick={handlePay} className="btn btn-info">Subscribe now</button>
        </div>
      </div>
    </>
  );
}

export default Payment;
