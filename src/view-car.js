import React from 'react';
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { activeModal } from "./redux/reducers/cars";
import { Carousel } from "react-responsive-carousel";
import './style/view-car.css'

const ViewCar = () => {
    const dispatch = useDispatch()
    const cars = useSelector((s) => s.cars)
    const idCar = useSelector((s) => s.idCar)
    const modal = useSelector((s) => s.activeModal)
    const filterCar = cars.filter(el => el._id === idCar)
    function closeModal(){
        dispatch(activeModal(false))
    }
    const customStyles = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)',
            width                 : '600px',
            height                 :'100%',
        }
    };
    return (
        <div>
            {
                modal ?
                    <div>
                        <Modal
                            isOpen={modal}
                            onRequestClose={closeModal}
                            style={customStyles}
                        >

                            <h2>{filterCar.map(el => `${el.brand} ${el.model}`)}</h2>
                            <form>
                                {
                                    filterCar.map((el) => (
                                        <div className="modal-car">
                                            <div className="item">
                                                <Carousel>
                                                    {
                                                        el.image.map(el => (
                                                            <div className="create_car_image-carousel">
                                                                <img src={el} alt=""/>
                                                            </div>
                                                        ))
                                                    }
                                                </Carousel>
                                                <div className="container_cars-title">
                                                    <div>
                                                        <span>{el.year}</span>
                                                        <span>{`${el.price}$`}</span>
                                                    </div>
                                                    <h3 className="cars-text">{`${el.brand} ${el.model} ${el.volume}`}</h3>
                                                </div>
                                            </div>
                                            <div className="title">
                                                <span>{`тип кузова: ${el.body}`}</span>
                                                <span>{`Привод: ${el.drive}`}</span>
                                                <span>{`тип топлива: ${el.fuel}`}</span>
                                                <span>{`тип трансмиссии: ${el.transmission}`}</span>
                                                <span>{`Расположение руля: ${el.wheel}`}</span>
                                                <span>{`год выпуска: ${el.year}`}</span>
                                                <span>{`объём двигателя: ${el.volume}`}</span>
                                                <span>{`Описание: ${el.title}`}</span>
                                                <h2>{`Цена: ${el.price}$`}</h2>
                                                <h2><a href={`tel:${el.phone}`}>Позвонить</a></h2>
                                            </div>
                                            <button className="close_btn" onClick={closeModal}>Закрыть</button>
                                        </div>
                                    ))
                                }
                            </form>
                        </Modal>
                    </div> : ''
            }
        </div>
    );
};

export default ViewCar;