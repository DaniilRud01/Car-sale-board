import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import './style/catalog.css'
import {activeModal, carId, filterCars, setModel} from "./redux/reducers/cars";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ViewCar from "./view-car";

const Catalog = () => {
    const dispatch = useDispatch()
    const [carEvent, setCarEvent] = useState('')
    const [search, setSearch] = useState('')
    const [inc, setInc] = useState()
    const [dec, setDec] = useState()
    const [carFilter, setCarFilter] = useState([])
    const category = useSelector((s) => s.category)
    const model = useSelector((s) => s.model)
    const cars = useSelector((s) => s.cars)
    const filterCar = useSelector((s) => s.filterCars)
    const event = useSelector((s) => s.event)
    const key = useSelector((s) => s.key)
    const searchCar = cars.filter(el => el.brand.toLowerCase().includes(search))
    useEffect(() => {
            setCarFilter(filterCar)
    }, [filterCar])
   useEffect(() => {
       const filtered = carFilter.filter(el => el[key] === event)
       setCarFilter(filtered)
   }, [key, event])
    useEffect(() => {
        const filtered = carFilter.filter(el => el[key] === Math.min(dec, inc))
        setCarFilter(filtered)
        console.log(key)
    }, [inc, dec])
    category.map(el => el.model.map(el => {
        if (carEvent){
            dispatch(setModel(el[carEvent]))
        }
    }))
    return (
        <div className="container">
            <div className="row">
                <div className="container_filters">
                    <div className="col-3">
                        <div className="item">
                            <select name="" id="catalog_filter_body-type" onChange={(e) => dispatch(filterCars( e.target.value, 'body' ))}>
                                <option value="">Все типы кузова</option>
                                {
                                   category.map(el => el.body.map(el => (
                                       <option value={el}>{el}</option>
                                   )))
                                }
                            </select>
                            <select name="" id="catalog_filter_type-drive" onChange={(e) => dispatch(filterCars( e.target.value, 'drive'))}>
                                <option value="">Тип привода</option>
                                {
                                    category.map(el => el.drive.map(el => (
                                        <option value={el}>{el}</option>
                                    )))
                                }
                            </select>
                            <div className="catalog_year_filter">
                                <input type="text" disabled={true} placeholder="Год" className="catalog_input-year"/>
                                <input type="text" placeholder="1940" value={dec} className="catalog_input-year-decrease" onChange={(e) => setDec(+e.target.value)}/>
                                <input type="text" placeholder="2020" value={inc} className="catalog_input-year-increase" onChange={(e) => {
                                    setInc(+e.target.value)
                                    dispatch(filterCars(inc, 'year'))
                                }}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="item">
                            <select name="" id="catalog_filter_body-type" onChange={(e) => {
                                setCarEvent(e.target.value)
                                dispatch(filterCars( e.target.value, 'brand'))}}>
                                <option value="">Все Марки</option>
                                {
                                    category.map(el => el.mark.map(el => (
                                        <option value={el}>{el}</option>
                                    )))
                                }
                            </select>
                            <select name="" id="catalog_filter_type-drive" onChange={(e) => dispatch(filterCars( e.target.value, 'transmission')) }>
                                <option value="">Все типы трансмисии</option>
                                {
                                    category.map(el => el.transmission.map(el => (
                                        <option value={el}>{el}</option>
                                    )))
                                }
                            </select>
                            <div className="catalog_year_filter">
                                <input type="text" disabled={true} placeholder="объём" className="catalog_input-year"/>
                                <input type="text" placeholder="0.0" className="catalog_input-year-decrease"/>
                                <input type="text" placeholder="8.81" className="catalog_input-year-increase"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="item">
                            <select name="" id="catalog_filter_body-type" onChange={(e) => dispatch(filterCars( e.target.value, 'model')) }>
                                <option value="">Все модели</option>
                                {
                                   model ? model.map(el => (
                                       <option value={el}>{el}</option>
                                   )) : ''
                                }
                            </select>
                            <select name="" id="catalog_filter_type-drive" onChange={(e) => dispatch(filterCars( e.target.value, 'fuel' ))}>
                                <option value="">Все типы топлива</option>
                                {
                                    category.map(el => el.fuel.map(el => (
                                        <option value={el}>{el}</option>
                                    )))
                                }
                            </select>
                            <div className="catalog_year_filter">
                                <input type="text" disabled={true} placeholder="Цена" className="catalog_input-year"/>
                                <input type="text" placeholder="100" className="catalog_input-year-decrease"/>
                                <input type="text" placeholder="1000000" className="catalog_input-year-increase"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="item">
                            <select name="" id="catalog_filter_type-drive" onChange={(e) => dispatch(filterCars( e.target.value, 'wheel')) }>
                                <option value="">Любое расположение руля</option>
                                {
                                    category.map(el => el.wheel.map(el => (
                                        <option value={el}>{el}</option>
                                    )))
                                }
                            </select>
                            <div className="catalog_year_filter">
                                <input type="text" placeholder="Поиск" className="catalog_search-input"
                                       onChange={(e) => setSearch( e.target.value.toLowerCase()) }/>
                            </div>
                            <button className="catalog_filter-btn" onClick={() => setCarFilter(cars)}>Сброс</button>
                        </div>
                    </div>
                </div>
                <div className="container_content">
                    <ViewCar/>
                        {
                            carFilter.length !== 0 ?
                            carFilter.map((el) => (
                                <div className="col-3">
                                    <div className="item" onClick={() => {
                                        dispatch(carId(el._id))
                                    }}>
                                        <Carousel>
                                            {
                                                el.image.map(el => (
                                                    <div className="create_car_image-carousel" onClick={() => {
                                                        dispatch(activeModal(true))
                                                    }}>
                                                        <img src={el} alt=""/>
                                                    </div>
                                                ))
                                            }
                                        </Carousel>
                                        <div className="container_cars-title">
                                            <div>
                                                <span>{el.year}</span>
                                                <span>{el.price}</span>
                                            </div>
                                            <span className="cars-text">{`${el.brand} ${el.model} ${el.volume}`}</span>
                                        </div>
                                    </div>
                                </div>
                            ))

                              :

                                searchCar.map((el) => (
                                <div className="col-3">
                               <div className="item" onClick={() => {
                                   dispatch(carId(el._id))
                               }}>
                                   <Carousel>
                                       {
                                          el.image.map(el => (
                                               <div className="create_car_image-carousel" onClick={() => {
                                                   dispatch(activeModal(true))
                                               }}>
                                                   <img src={el} alt=""/>
                                               </div>
                                           ))
                                       }
                                   </Carousel>
                                    <div className="container_cars-title">
                                        <div>
                                            <span>{el.year}</span>
                                            <span>{el.price}</span>
                                        </div>
                                        <span className="cars-text">{`${el.brand} ${el.model} ${el.volume}`}</span>
                                    </div>
                               </div>
                                </div>
                            ))
                        }
                </div>
            </div>
        </div>
    );
};

export default Catalog;