import axios from 'axios';
import Result from './Result';

export async function Authorization(bearer) {
    var data = {};
    var result = new Result();
    try {
        var authCode = bearer.split(' ')[1];
        await axios.post('http://localhost:3000/api/v1/userLogin/authorize', { Authorization: authCode })
            .then(response => {
                data = response.data;
            })
            .catch(err => {

                data = err.response.data;
            });
        return data;
    } catch (e) {
        result.message = e;
        result.successful = false;
        return result;
    }

};