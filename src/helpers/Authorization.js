import axios from 'axios';
import Result from './Result';

export async function Authorization(bearer) {
    var data = {};
    var result = new Result();
    try {
        var authCode = bearer.split(' ')[1];
        await axios.post('http://5aa2c5bc.ngrok.io/api/v1/userLogin/authorize', { Authorization: authCode })
            .then(response => {
                console.log(response.data)
                data = response.data;
            })
            .catch(err => {

                data = err.response.data;
            });
        return data;
    } catch (e) {
        console.log(e);
        result.message = e;
        result.successful = false;
        return result;
    }

};
