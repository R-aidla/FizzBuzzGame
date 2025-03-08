import { ResetButtons, CheckSelection, interrupted } from "./main.js"

export function setupOptionButton(element) {
  let selected = false
  const setSelection = (selection) => {
    selected = selection
    modifiySelectedClass(element, selected)
  }
  const toggleSelection = () => {
    if(interrupted)
      return;

    selected = !selected
    modifiySelectedClass(element, selected)
  }
  
  element.addEventListener('click', () => toggleSelection())
  setSelection(false)
}

export function setupSubmitButton(element) {
  const submitSelection = () => {
    if(interrupted)
      return;

    CheckSelection();
    ResetButtons();
  }
  element.addEventListener('click', () => submitSelection())
}

function modifiySelectedClass(element, selected){
  if(selected)
    element.classList.add("selected")
  else
    element.classList.remove("selected")
}