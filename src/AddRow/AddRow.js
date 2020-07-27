import React from "react";

export default props => {
  return (
    <div>
      {props.activeInput ? (
        <form className="mb-3" onSubmit={props.handleFormSubmit}>
          <label className="mr-4">
            ID
            <br />
            <input
              onChange={props.handleInputChange}
              type="number"
              required
              name="id"
              value={props.newId}
            />
          </label>
          <label className="mr-4">
            First Name
            <br />
            <input
              onChange={props.handleInputChange}
              type="text"
              required
              name="firstName"
              value={props.newFirstName}
            />
          </label>
          <label className="mr-4">
            Last Name
            <br />
            <input
              onChange={props.handleInputChange}
              type="text"
              required
              name="lastName"
              value={props.newLastName}
            />
          </label>
          <label className="mr-4">
            E-mail
            <br />
            <input
              onChange={props.handleInputChange}
              type="text"
              required
              name="email"
              value={props.newEmail}
            />
          </label>
          <label className="mr-4">
            Phone
            <br />
            <input
              onChange={props.handleInputChange}
              type="tel"
              required
              name="phone"
              value={props.newPhone}
            />
          </label>
          <button type="submit" value="Submit">
            Add user
          </button>
        </form>
      ) : (
        <button
          className="btn btn-outline-success mb-3"
          onClick={props.activateInputRow}
        >
          Add
        </button>
      )}
    </div>
  );
};
