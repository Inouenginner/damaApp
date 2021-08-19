export const FETCH_PRODUCTS = "FETCH_WAZAS";
export const fetchProductsAction = (wazas) => {
    return {
        type: "FETCH_WAZAS",
        payload: wazas
    }
};