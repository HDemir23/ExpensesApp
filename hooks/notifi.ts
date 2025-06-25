import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { View ,Text} from "react-native";
import * as Localization from "expo-localization";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { RatesType } from "@/types/expenses";



type props= {
    currency :string
}




export default function ApiReq({currency}: props) {
    const [rates, setRates] = useState<{ [key: string] : number}> ({})
    const LocalMoney = Localization.currency  || "USD"

    useEffect(() => {
        axios
        .get(`https://api.exchangerate-api.com/v4/latest/${LocalMoney}`)
        .then(async (res) => {
            const fullRates: RatesType = {
              base: LocalMoney,
              rates: res.data.rates,
            };
                
            setRates(fullRates.rates)
            await saveRates(fullRates)
        })
        .catch(err => {
            console.log(err)
        })
    }, [currency])

    

    const saveRates = async (newRates: RatesType) => {
        await AsyncStorage.setItem("rates", JSON.stringify(newRates))
    } 


}

