import { SWITCH_MODE } from "../constant/redux.constant";

export const setMode = (mode) => ({
    type: SWITCH_MODE,
    mode
})