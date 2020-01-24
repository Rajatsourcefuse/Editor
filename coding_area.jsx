import { el, mount, list, unmount, setAttr } from 'redom';
import {default as inputData} from './inputField.jsx';

class Coding_area {
  constructor() {
    this.data = {
      test_case: [],
      test_output: [],
    };
    this.inputList=inputData((data, index)=>{
      this.data.test_case[index]=data;
      console.log(this.data);
    });

    this.outputList=inputData((data, index)=>{
      this.data.test_output[index]=data;
      console.log(this.data);
    });

    this.el =
      ('div',
      (
        <div class="flex flex-col">
          <h2 class="text-2xl mb-4 problemTitle">Add new problem here</h2>
          <input
            id="problem"
            type="text"
            placeholder="Ener problem here..."
            class="bg-gray-200 appearance-none border-2 border-gray-200
            rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none
            focus:bg-white focus:border-purple-500 mb-4"
            onkeyup={evt => {
              problemHandler(evt);
            }}
          />
          <div class="testField">
            <label class="textLabel">Enter test case here : </label>
            <button
              class="addButton"
              onclick={() => {
                console.log(this.data.test_case);
                this.data.test_case.push('');
                this.inputList.update(this.data.test_case);
              }}
            >
              +
            </button>
          </div>
          <div class="testField">
            <label class="textLabel">Enter Output here : </label>
            <button
              class="addButton"
              onclick={() => {
                this.data.test_output.push('');
                this.outputList.update(this.data.test_output);
              }}
            >
              +
            </button>
          </div>
        </div>
      ));
    console.log(this.el.children);
    mount(this.el.children[2], this.inputList, this.el.children[2].lastChild);
    mount(this.el.children[3], this.outputList, this.el.children[3].lastChild);

    const problemHandler = evt => {
      this.data.problem = evt.target.value;
    };

    const testCaseHandler = evt => {
      this.data.test_case = evt.target.value;
    };

    const outputHandler = evt => {
      this.data.test_output = evt.target.value;
    };
  }

  update(data) {
    this.data = { ...data };
    this.el.children[1].value = data.problem;
    this.inputList.update(data.test_case);
    this.outputList.update(data.test_output);
  }

  newProblem() {
    this.el.children[1].value = '';
    this.el.children[2].value = '';
    this.el.children[3].value = '';
  }

  getData() {
    return this.data;
  }
}

const codingArea = new Coding_area();

export default codingArea;
