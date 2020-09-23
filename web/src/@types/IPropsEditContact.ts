import IContact from './IContact';

export default interface IPropsEditContact {
  visible: boolean;
  close(): void;
  data: IContact;
  loadingData: number;
}
