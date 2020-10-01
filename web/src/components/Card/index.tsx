import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { IoMdContact } from 'react-icons/io';

import formatPhoneNumber from '../../utils/formatPhoneNumber';
import handleImage from '../../utils/handleImage';

import { Props } from './types';

import {
  Container,
  AvatarSelect,
  OpenInfo,
  Fullname,
  Phone
} from './styles';

const ContactCard: React.FC<Props> = ({ data, ...props}) => {
  const [selected, setSelected] = useState(false);

  function handleSelectContactRemove() {
    if (!selected) {
      props.select();

      return setSelected(true);
    }
    
    props.unselect();

    return setSelected(false);
  }

  return (
    <Container>
      <AvatarSelect onClick={handleSelectContactRemove}>
        {
          selected
          ? <FaCheckCircle color="#46ee89" width="100%" height="100%"/>
          : handleImage(data)
        }
      </AvatarSelect>

      <OpenInfo onClick={props.modalVisible}>
        <Fullname>
          {`${data.firstName} ${data.lastName}`}
        </Fullname>

        <Phone>
          {
            formatPhoneNumber(data.phone)
          }
        </Phone>
      </OpenInfo>
    </Container>
  )
}

export default ContactCard;
