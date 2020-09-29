import { Contact } from '../../@types/';

export interface ICard {
  data: Contact;
  selected(): void;
  deselect(): void;
  setEditContactVisible(): void;
}
