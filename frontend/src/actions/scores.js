import axios from 'axios';
import url from '../utils/backendUrl'

let backend_url = url()

const getTotalScore = () => {
    return async (dispatch) => {
      try {
        const res = await axios.get(backend_url+'/api/scores/total');
        return res.data
      } catch (error) {
        console.log(error);
      }
    };
  };

  const getScoreByDate = (date) => {
    return async (dispatch) => {
      try {
        const body = JSON.stringify({date});
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const res = await axios.post(backend_url+'/api/scores/date', body, config);
        return res.data
      } catch (error) {
        console.log(error);
       
      }
    };
  };

  export {getTotalScore,getScoreByDate}