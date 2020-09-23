import React from 'react';
import { IoMdContact } from 'react-icons/io';

import IContact from '../@types/IContact';

export default function handleImage(data: IContact) {
  if (data.image === 'http://192.178.31.105:3333/uploads/noimage') {
    return (
      <div className="contact-card-avatar">
        <IoMdContact />
      </div>
    )
  }

  return (
    <img
      className="contact-card-avatar"
      src={data.image} 
      alt={`${data.first_name} ${data.last_name}`}
    />
  )
}