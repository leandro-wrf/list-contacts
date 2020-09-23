import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { IoMdContact } from 'react-icons/io';

import formatPhoneNumber from '../../utils/formatPhoneNumber';
import handleImage from '../../utils/handleImage';

import IProps from '../../@types/IPropsCard';

import './styles.css';

const ContactCard: React.FC<IProps> = ({ data, selected, deselect, setEditContactVisible }) => {
  const [item, setItem] = useState(false);

  function handleSelectContactRemove() {
    if (!item) {
      selected();
      return setItem(true);
    }
    deselect();
    setItem(false)
  }

  return (
    <div className="contact-card">
      <button 
        className="contact-card-avatar"
        onClick={handleSelectContactRemove}
      >
        {
          item
          ? (
            <div className="contact-select">
              <FaCheckCircle />
            </div>
          )
          : handleImage(data)
        }
      </button>
      <button 
        className="contact-card-info"
        onClick={setEditContactVisible}
      >
        <span
          className="contact-card-info-fullname"
        >
          {`${data.first_name} ${data.last_name}`}
        </span>
        <span
          className="contact-card-info-phone"
        >
          {
            formatPhoneNumber(data.phone)
          }
        </span>
      </button>
    </div>
  )
}

export default ContactCard;
