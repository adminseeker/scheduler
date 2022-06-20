import axios from 'axios';
import url from '../utils/backendUrl'

let backend_url = url()

const getTotalScore = () => {
    return async (dispatch) => {
      try {
        const res = await axios.get(backend_url+'/api/scores/total');
        console.log(res.data)
        return res.data
      } catch (error) {
        console.log(error);
      }
    };
  };

  export {getTotalScore}