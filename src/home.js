import React, {useEffect} from 'react';
import Header from "./header";
import { Route } from "react-router-dom";
import Catalog from "./catalog";
import {useDispatch} from "react-redux";
import {getCars, getCategory} from "./redux/reducers/cars";

const Home = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCars())
        dispatch(getCategory())
    })
    return (
        <div>
           <Header />
            <Route exact path="/" component={() => <Catalog />}/>
        </div>
    );
};

export default Home;