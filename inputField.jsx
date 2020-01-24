import { el, mount, list, unmount, setAttr } from 'redom';
let dd, ind;

export default (...args) => {

  let inputData;

  class inputField {
    constructor() {
      this.el = el('input', {
        class: ` 
        arrayinput
        rounded py-2 px-2 focus:outline-none
        focus:bg-white focus:border-purple-500 mb-4 w-13`,
      });
  
      this.el.onkeyup = evt => {
        console.log(evt);
        dd=evt.target.value;
        ind= parseInt(this.el.id);
        inputData.updateData(dd, ind);
      };
    }
  
    update(data, index) {
      this.el.value = data;
      setAttr(this.el, {
        id: `${index}`,
      });
    }
  }
  inputData = list('ul.inputlist', inputField);
  [inputData.updateData] = args;
  return inputData;
};
