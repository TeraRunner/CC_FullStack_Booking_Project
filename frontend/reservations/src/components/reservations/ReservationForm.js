import React from 'react';
import Request from '../../helpers/Request';

const ReservationForm = (props) => {


  function handleSubmit(event){
    event.preventDefault();
    const customer = {
      "firstName": event.target.firstName.value,
      "lastName": event.target.lastName.value,
      "phoneNum": event.target.phoneNum.value,
    }
    const reservation = {
        "startTime": event.target.startTime.value,
        "date": event.target.date.value,
        "numGuest": event.target.numGuest.value,
        "restaurant": "http://localhost:8080/restaurant/1",
        "customer": null
    }
    const req = new Request()
    req.post('/customers', customer)
      .then(data => data.json())
      .then((newCustomer) => {
        reservation.customer = "http://localhost:8080/customers/" + newCustomer.id
        return reservation;
      })
      .then(reservation => props.handleReservationPost(reservation));
  }

      return (
        <div>
          <form onSubmit={handleSubmit} className="reservationForm">
            <input type="text" placeholder="startTime" name="startTime"/>
            <input type="text" placeholder="First Name" name="firstName"/>
            <input type="text" placeholder="Last Name" name="lastName"/>
            <input type="text" placeholder="date" name="date"/>
            <input type="number" placeholder="phoneNum" name="phoneNum"/>
            <input type="number" placeholder="numGuest" name="numGuest"/>
            <button type="submit">Save</button>
          </form>
        </div>
    )


}

export default ReservationForm;
