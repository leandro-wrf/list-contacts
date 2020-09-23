import IContact from './IContact';

export default interface IPropsAddContact {
  data: IContact;
  selected(): void;
  deselect(): void;
  setEditContactVisible(): void;
}
