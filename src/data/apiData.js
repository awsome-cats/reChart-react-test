import axios from 'axios'

const baseUrl = 'https://covid19.mathdro.id/api/'

export const getData = async() => {
    try {
        const {data} = await axios.get(baseUrl + 'daily')
        return data

    } catch(err) {
        throw err
    }
}

