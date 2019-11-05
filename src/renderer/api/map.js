import axios from 'axios'

function getAdress(location) {
    let url = `https://restapi.amap.com/v3/geocode/regeo`
    return axios.get(url, {
        params: {
            key: 'fcc40763f5796ca282b36bc70aea3666',
            radius: 10,
            extensions: 'base',
            roadlevel: 1,
            location
        }
    })
}

export {
    getAdress
}