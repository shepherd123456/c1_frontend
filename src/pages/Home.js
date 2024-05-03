import { useEffect } from 'react'

import axios from 'axios';
import config from '../config.json';

function Home() {
  useEffect(() => {
    async function postTest(data) {
      const res = await axios.post(`${config.baseURL}/sign-up`, data);
      console.log(res);
    }
    postTest({ 'abc': 1, 'mnb': 85 });
  }, []);

  return (
    <div className='bg-red-500'>
      whosup?
    </div>
  )
}

export default Home