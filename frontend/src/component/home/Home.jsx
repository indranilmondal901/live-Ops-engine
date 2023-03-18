import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar';
import '../home/Home.css'

const Home = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    fetch("http://localhost:8080/showOrder")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setData(data);
      })
  }, [])

  return (
    <div>
      <Navbar />
      <h1>Here Is All Deal</h1>
      <div>
        <h2> If You Are Admin, Pls Login To Create Offer</h2>
      </div>
      <div id="product_list">
        {data?.data?.map((sdata) => {
          return (
            <div id="product" key={sdata._id}>
              <img src={sdata.offer_image} alt={sdata.offer_title}></img>
              <div>
                <h3>{sdata.offer_title}</h3>
                <p>Price : {sdata.pricing[0].currency} {sdata.pricing[0].cost}</p>
                <p>Offer : {sdata.offer_description} off</p>
                <button>Buy now</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home;
