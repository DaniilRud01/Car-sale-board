import axios from 'axios'

const initialState = {
    cars: [],
    category:[],
    model:[],
    image:[],
    filterCars: [],
    idCar:'',
    activeModal: false,
    key:'',
    event:''
}

const SET_CARS = 'SET_CARS'
const SET_CATEGORY = 'SET_CATEGORY'
const SET_MODEL = 'SET_MODEL'
const SET_IMAGE = 'SET_IMAGE'
const CAR_ID = 'CAR_ID'
const ACTIVE_MODAL = 'ACTIVE_MODAL'
const FILTER_CARS = 'FILTER_CARS'
const EVENT = 'EVENT'

export default function (state = initialState, action){
    switch (action.type){
        case SET_CARS:
            return { ...state, cars: action.cars }
        case SET_CATEGORY:
            return { ...state, category: action.category }
        case SET_MODEL:
            return { ...state, model: action.model }
        case SET_IMAGE:
                return { ...state, image: [...state.image, action.image] }
        case CAR_ID:
            return { ...state, idCar: action.idCar }
        case ACTIVE_MODAL:
            return { ...state, activeModal: action.activeModal }
        case FILTER_CARS:
            return { ...state, filterCars: action.filterCars }
        case EVENT:
            return { ...state, event: action.event, key: action.key }
        default:
            return state
    }
}

export const filterCars =  (event, key) => {
    return (dispatch, getState) => {
        const cars = getState().cars
        const filteredCars = getState().filterCars
        const filter = cars.filter(el => el[key] === event)
        filteredCars.length === 0 ?
        dispatch({type: FILTER_CARS, filterCars:filter})
            :
        dispatch({type: EVENT, event,key})
    }
}

export const activeModal = (event) => {
    return {type: ACTIVE_MODAL, activeModal: event}
}

export const carId = (id) => {
    console.log(id)
    return {type: CAR_ID, idCar: id}
}

export const setImage = (image) => {
    return {type: SET_IMAGE, image}
}

export const setModel = (event) => {
    return {type: SET_MODEL, model:event}
}

export const getCars = () => {
    return (dispatch) => {
        axios('http://localhost:8080/').then(({data}) => {
            dispatch({type: SET_CARS, cars: data})
        })
    }
}
export const getCategory = () => {
    return (dispatch) => {
        axios('http://localhost:8080/category').then(({ data }) => {
            dispatch({type: SET_CATEGORY, category: data})
        })
    }
}

export const setCars = (car) => {
    console.log(car)
    return () => {
        axios.post('http://localhost:8080/', car)
    }
}

