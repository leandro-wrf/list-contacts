import { Contact } from '../../@types/';

export interface Props {
  data: Contact;
  select(): void;
  unselect(): void;
  modalVisible(): void;
}
