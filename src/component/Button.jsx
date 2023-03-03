const Button = (props) => {
  return (
    <div className="d-grid gap-2 col-3 mx-auto join-button">
      <input
        type='text'
        className="text-center"
        value={props.customerId} placeholder="Enter customer ID"
        onChange={props.cutomrtIdChange}
      />
      <button onClick={props.click} type="button" className="btn btn-primary">
        {props.name}
      </button>
    </div>
  )
}

export default Button