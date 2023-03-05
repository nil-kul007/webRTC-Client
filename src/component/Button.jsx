const Button = (props) => {
  return (
    <div className="d-grid col-4 mx-auto join-button shadow p-3 mb-2 bg-body-tertiary rounded">
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">@</span>
        <input
          type="text"
          className="form-control"
          aria-label="Customer ID"
          aria-describedby="basic-addon1"
          value={props.customerId} 
          placeholder="Enter customer ID"
          onChange={props.cutomrtIdChange}
        />
      </div>
      <button
        onClick={props.click}
        type="button" 
        className="btn btn-primary"
      >
        {props.name}
      </button>
    </div>
  )
}

export default Button