export const FETCH_WAZAS = "FETCH_WAZAS";
export const fetchWazasAction = (wazas) => {
    return {
        type: "FETCH_WAZAS",
        payload: wazas
    }
};