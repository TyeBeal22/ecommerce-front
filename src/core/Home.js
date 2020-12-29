import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';


const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('quantity').then(data => {
            console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
       
        <Layout 
            title="Bullish Breaks"
            description="#1 Source for Sports Cards"
            className="container-fluid"   
        >
     
            <Search />

           
           <div className="row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-sm-3 mb-3">
                    <Zoom>
                        <Card product={product} />
                        </Zoom>
                    </div>
                 
                ))}
                </div>
              
{/*
            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
           */ }
        </Layout>
    );
};

export default Home;
