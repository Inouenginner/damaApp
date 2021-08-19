import {createSelector} from 'reselect';

const wazasSelector = (state) => state.wazas;

export const getWazas = createSelector(
    [wazasSelector], state => state.list
)