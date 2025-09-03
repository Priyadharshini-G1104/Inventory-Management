import { createContext, useContext, useReducer, useEffect } from "react"
import useLocalStorage from "../hooks/useLocalStorage"

const SalesContext = createContext(null)
const SalesDispatchContext = createContext(null)

export function SalesProvider({children}){
    const [salesInLS, setSalesInLS] = useLocalStorage("sales",[])
    const [sales, dispatch] = useReducer(salesReducer, salesInLS)

    useEffect(()=>{
        setSalesInLS(sales)
    })

    return (
        <SalesContext.Provider value={sales}>
            <SalesDispatchContext.Provider value={dispatch}>
                {children}
            </SalesDispatchContext.Provider>
        </SalesContext.Provider>
    )
}

export function useSales(){
    return useContext(SalesContext)
}
export function useSalesDispatch(){
    return useContext(SalesDispatchContext)
}

function salesReducer(state, action){
    switch (action.type) {
        case 'NEW_SALE':{
            return [
                ...state,{
                    products: action.products,
                    saleValue: action.saleValue,
                    datetime: new Date(),
                }
            ]
        }
        default:{
            console.log('Unknown action type: ', action.type)
            return state
        }
    }
}