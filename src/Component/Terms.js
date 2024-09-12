import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from './BaseUrl'

const Terms = () => {
  const [policy, getPolicy] = useState([])

  async function getpolicy() {
    axios.get(`${BASE_URL}/terms`)
      .then((res) => {
        getPolicy(res.data)
      })
  }


  useEffect(() => {
    getpolicy()
  }, [])



  return (
    <div>
      {policy.map((item, index) => {
        return (
          <div key={index} className='mt70 p-2'>
            <div dangerouslySetInnerHTML={{ __html: item.description }} ></div>
          </div>
        )
      })}
    </div>
  )
}

export default Terms