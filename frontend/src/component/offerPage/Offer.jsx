import React, { useState } from 'react';
import axios from 'axios';
import '../offerPage/Offer.css'
import Navbar from '../navbar/Navbar'

const Offer = () => {
  const [offerData, setOfferData] = useState({
    offer_id: '',
    offer_title: '',
    offer_description: '',
    offer_image: '',
    offer_sort_order: '',
    content: [{ quantity: 0 }],
    schedule: {
      days_of_week: [],
      dates_of_month: [],
      months_of_year: [],
    },
    target: '',
    pricing: [{ currency: '', cost: 0 }],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOfferData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(offerData);
    axios.post('http://localhost:8080/offercreated', { offer :JSON.stringify(offerData)})
      .then((res) => {
        console.log(res)
      }).catch((err) => { console.log(err.message) });
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <label htmlFor="offer_id">Offer ID</label>
        <input
          type="text"
          id="offer_id"
          name="offer_id"
          value={offerData.offer_id}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="offer_title">Offer Title</label>
        <input
          type="text"
          id="offer_title"
          name="offer_title"
          value={offerData.offer_title}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="offer_description">Offer Description</label>
        <textarea
          id="offer_description"
          name="offer_description"
          value={offerData.offer_description}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="offer_image">Offer Image URL</label>
        <input
          type="text"
          id="offer_image"
          name="offer_image"
          value={offerData.offer_image}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="offer_sort_order">Offer Sort Order</label>
        <input
          type="number"
          id="offer_sort_order"
          name="offer_sort_order"
          value={offerData.offer_sort_order}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={offerData.content[0].quantity}
          onChange={(event) => {
            const { value } = event.target;
            setOfferData((prevState) => ({
              ...prevState,
              content: [{ quantity: value }],
            }));
          }}
          required
        />

        <label htmlFor="days_of_week">Days of Week</label>
        <input
          type="text"
          id="days_of_week"
          name="days_of_week"
          value={offerData.schedule.days_of_week.join(',')}
          onChange={(event) => {
            const { value } = event.target;
            setOfferData((prevState) => ({
              ...prevState,
              schedule: {
                ...prevState.schedule,
                days_of_week: value.split(',').map((day) => Number(day)),
              },
            }));
          }}
          required
        />

        <label htmlFor="months_of_year">Months of Year</label>
        <input
          type="text"
          id="months_of_year"
          name="months_of_year"
          value={offerData.schedule.months_of_year.join(',')}
          onChange={(event) => {
            const { value } = event.target;
            setOfferData((prevState) => ({
              ...prevState,
              schedule: {
                ...prevState.schedule,
                months_of_year: value.split(',').map((month) => Number(month)),
              },
            }));
          }}
          required
        />

        <label htmlFor="target">Target</label>
        <select
          id="target"
          name="target"
          value={offerData.target}
          onChange={handleInputChange}
          required
        >
          <option value="">Select target...</option>
          <option value="new_users">New Users</option>
          <option value="existing_users">Existing Users</option>
        </select>

        <label htmlFor="currency">Currency</label>
        <input
          type="text"
          id="currency"
          name="currency"
          value={offerData.pricing[0].currency}
          onChange={(event) => {
            const { value } = event.target;
            setOfferData((prevState) => ({
              ...prevState,
              pricing: [{ ...prevState.pricing[0], currency: value }],
            }));
          }}
          required
        />

        <label htmlFor="cost">Cost</label>
        <input
          type="number"
          id="cost"
          name="cost"
          value={offerData.pricing[0].cost}
          onChange={(event) => {
            const { value } = event.target;
            setOfferData((prevState) => ({
              ...prevState,
              pricing: [{ ...prevState.pricing[0], cost: Number(value) }],
            }));
          }}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Offer;
