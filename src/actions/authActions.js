export function handleInputChange(event, dispatch) {
  const inputName = event.target.name;
  const inputValue = event.target.value;

  dispatch({
    type: "HANDLE_INPUT_CHANGE",
    inputName,
    inputValue
  });
}