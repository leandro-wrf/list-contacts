import React from 'react';
import { IoMdContact } from 'react-icons/io';

import { Contact } from '../@types';

export default function handleImage(data: Contact) {
  if (data.image === 'http://localhost:3333/uploads/noimage') {
    return (
      <div className="contact-card-avatar">
        <IoMdContact size={82} color="#46ee89" />
      </div>
    )
  }

  return (
    <img
      className="contact-card-avatar"
      src={data.image} 
      alt={`${data.firstName} ${data.lastName}`}
    />
  )
}
