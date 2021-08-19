export const FETCH_WAZAS = "FETCH_WAZAS";
export const fetchWazasAction = (wazas) => {
    return {
        type: "FETCH_WAZAS",
        payload: wazas
    }
};
export const UPDATE = "UPDATE";
export const uploadWazaInfo = (wazas) => {
    return {
        type: "UPDATE",
        payload: wazas
    }
};
export const INIT = "INIT";
export const fetchWazasAction = (wazas) => {
    return {
        type: "INIT",
        payload: wazas
    }
};