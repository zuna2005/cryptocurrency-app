import axios from "axios"
import { API_KEY } from "../configs/configs";

export function getCoinRate(coin: string) {
    return axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=USD&api_key=${API_KEY}`)
}