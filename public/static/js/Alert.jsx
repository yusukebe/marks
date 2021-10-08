const InfoAlert = (props) => {
  const Alert = ReactBootstrap.Alert
  const CloseButton = ReactBootstrap.CloseButton
  return (
    <Alert show={props.showInfo.show} variant="success">
      <p>{props.showInfo.url} is added!</p>
      <div className="d-flex justify-content-end">
        <CloseButton
          onClick={() =>
            props.setShowInfo({ show: false, url: props.showInfo.url })
          }
        ></CloseButton>
      </div>
    </Alert>
  )
}
