import React, {useCallback, useState} from 'react';
import Modal from 'react-modal'
import './style/header.css'
import './style/create-cars.css'
import {useDispatch, useSelector} from "react-redux";
import {setCars, setImage, setModel} from "./redux/reducers/cars";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const CreateCars = ({openModal, setOpenModal}) => {
    const dispatch = useDispatch()
    const [carEvent, setCarEvent] = useState('')
    const image = useSelector((s) => s.image)
    const category = useSelector((s) => s.category)
    const model = useSelector((s) => s.model)
    const [newEvent, setNewEvent] = useState({})
    const [newImage, setNewImage] = useState([])
    category.map(el => el.model.map(el => {
        if (carEvent){
            dispatch(setModel(el[carEvent]))
        }
    }))
    console.log(newEvent)
    const closeModal = () => {
        setOpenModal(false);
    }
    const getBase64 = useCallback((file) => {
        return new Promise((res, rej) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                res(reader.result)
            }
            reader.onerror = (error) => {
                rej(error)
            }
        })
    }, [])
    const handleOnChange = useCallback(async (e) => {
        const b64 = await getBase64(e.target.files[0])
        setNewImage([...newImage, b64])
        setNewEvent({...newEvent, image: [...newImage, b64]})
        dispatch(setImage(b64))
    }, [getBase64, newEvent])
    return (
        <div>
            <Modal
                isOpen={openModal}
                onRequestClose={closeModal}
            >
                <div className="row">
                    <div className="modal_item">
                        <div className="container_filters">
                            <div className="col-3">
                                <div className="modal_item">
                                    <select name="" id="catalog_filter_body-type"
                                            onChange={(e) => setNewEvent({...newEvent, body: e.target.value})}>
                                        <option value="">Тип кузова</option>
                                        {
                                            category.map(el => el.body.map(el => (
                                                <option value={el}>{el}</option>
                                            )))
                                        }
                                    </select>
                                    <select name="" id="catalog_filter_type-drive"
                                            onChange={(e) => setNewEvent({...newEvent, drive: e.target.value})}>
                                        <option value="">Тип привода</option>
                                        {
                                            category.map(el => el.drive.map(el => (
                                                <option value={el}>{el}</option>
                                            )))
                                        }
                                    </select>
                                    <div className="catalog_year_filter">
                                        <input type="text" placeholder="Год" className="catalog_input-year"/>
                                        <input type="text" placeholder="1940" className="add-cars_input_year"
                                               onChange={(e) => setNewEvent({...newEvent, year: e.target.value})}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="modal_item">
                                    <select name="" id="catalog_filter_body-type"
                                            onChange={(e) => {
                                                setNewEvent({...newEvent, brand: e.target.value})
                                                setCarEvent(e.target.value)
                                            }}>
                                        <option value="Все марки">Марка</option>
                                        {
                                            category.map(el => el.mark.map(el => (
                                                <option value={el}>{el}</option>
                                            )))
                                        }
                                    </select>
                                    <select name="" id="catalog_filter_type-drive"
                                            onChange={(e) => setNewEvent({...newEvent, transmission: e.target.value})}>
                                        <option value="Все типы трансмиссии">Тип трансмисии</option>
                                        {
                                            category.map(el => el.transmission.map(el => (
                                                <option value={el}>{el}</option>
                                            )))
                                        }
                                    </select>
                                    <div className="catalog_year_filter">
                                        <input type="text" placeholder="объём" className="catalog_input-year"/>
                                        <input type="text" placeholder="0.0" className="add-cars_input_volume"
                                               onChange={(e) => setNewEvent({...newEvent, volume: e.target.value})}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="modal_item">
                                    <select name="" id="catalog_filter_body-type"
                                            onChange={(e) => setNewEvent({...newEvent, model: e.target.value})}>
                                        <option value="">Модели</option>
                                        {
                                            model ? model.map(el => (
                                                <option value={el}>{el}</option>
                                            )) : ''
                                        }
                                    </select>
                                    <select name="" id="catalog_filter_type-drive"
                                            onChange={(e) => setNewEvent({...newEvent, fuel: e.target.value})}>
                                        <option value="">Тип топлива</option>
                                        {
                                            category.map(el => el.fuel.map(el => (
                                                <option value={el}>{el}</option>
                                            )))
                                        }
                                    </select>
                                    <div className="catalog_year_filter">
                                        <input type="text" placeholder="Цена" className="catalog_input-year"/>
                                        <input type="text" placeholder="100" className="add-cars_input_price"
                                               onChange={(e) => setNewEvent({...newEvent, price: e.target.value})}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="modal_item">
                                    <select name="" id="catalog_filter_type-drive"
                                            onChange={(e) => setNewEvent({...newEvent, wheel: e.target.value})}>
                                        <option value="">Расположение руля</option>
                                        {
                                            category.map(el => el.wheel.map(el => (
                                                <option value={el}>{el}</option>
                                            )))
                                        }
                                    </select>
                                    <input type="" placeholder="Введите номер телефона" className="phone_input" onChange={(e) => setNewEvent({...newEvent, phone: e.target.value})}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal_row">
                    <div className="col-4">
                        <div className="modal_item">
                            <textarea name="" id="create_car-title" cols="30" rows="10" placeholder="Описание авто" onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}/>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="modal_item">
                            <div className="item_input">
                            <input onChange={handleOnChange} multiple={true} type="file" id="create_image-text"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="modal_item">
                            <Carousel>
                                {
                                    image.map(el => (
                                        <div className="create_car_image-carousel">
                                            <img src={el} alt=""/>
                                        </div>
                                    ))
                                }
                            </Carousel>

                        </div>
                    </div>
                </div>
                <button className="create_car-btn" onClick={() => {
                    dispatch(setCars(newEvent))
                    closeModal()
                }}>Добавить авто
                </button>
                <button className="close_btn" onClick={() => {
                    closeModal()
                }}>Отмена
                </button>
            </Modal>
        </div>
    );
};

export default CreateCars;