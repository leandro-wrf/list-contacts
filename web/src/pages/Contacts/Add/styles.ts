.modal {
  height: 97%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.modal-avatar {
  margin-bottom: 40px;
}

.modal-form {
  width: 100%;

  display: block;
  box-sizing: border-box; 
}

.modal-form-group {
  display: flex;
  justify-content: space-between;
}

.modal-form-group input {
  background-color: #f2f2f2;

  height: 50px;
  width: 100%;

  padding-left: 16px;

  border: none;
  border-radius: 8px;
  outline: none;

  color: #000000;
  font-family: 'Ubuntu', sans-serif;
  font-size: 16px;

  display: flex;
}

.modal-form-group input:nth-child(1) {
  margin-right: 8px;
  margin-left: 8px;
}

.modal-form-group input:nth-child(2) {
  margin-right: 8px;
}

.modal-form-email {
  background-color: #f2f2f4;

  height: 50px;
  width: 92%;

  padding-left: 16px;
  margin: 16px 8px 16px 8px;

  border: none;
  border-radius: 8px;
  outline: none;

  color: #000000;
  font-family: 'Ubuntu', sans-serif;
  font-size: 16px;
}

.modal-form select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  flex: 1;

  background-color: #f2f2f4;

  height: 50px;
  width: 100%;

  padding: 16px;
  margin: 0px 8px 16px 8px;

  cursor: pointer;
  border: none;
  border-radius: 8px;
  outline: none;


  color: #6c6c80;
  font-size: 16px;
  font-family: 'Ubuntu', sans-serif;
}

.modal-form button {
  background-color: #46ee89;

  height: 50px;

  padding: 16px;
  margin-right: 8px;

  cursor: pointer;
  border: none;
  border-radius: 8px;
  outline: none;

  color: #fff;
  font-size: 20px;
  font-family: 'Ubuntu', sans-serif;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;
}
