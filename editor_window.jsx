import { el, mount, list } from 'redom';
import 'ace-builds';
import './node_modules/ace-builds/src-noconflict/ext-language_tools.js';
import {default as codingArea} from './coding_area.jsx';
ace.config.set('basePath', '/ace-builds/');



class Editor_window {
  constructor() {
    this.data = {};
    let dragging = false;

    this.el = el(
      'div',
      { style: 'height: calc(100% - 40px)' },
      <div
        class="flex flex-col h-full"
        onmousemove={e => {
          if (!dragging) {
            return;
          }

          const height = Math.min(
            70,
            Math.max(
              25,
              (100 * (document.body.clientHeight - e.clientY)) /
                document.body.clientHeight,
            ),
          );

          document.getElementById('outputdiv').style.height = `${height}vh`;
        }}
        onmouseup={e => {
          if (dragging) {
            document.body.style.cursor = 'auto';
          }
          dragging = false;
        }}
      >
        <div>
          <div class="addProblem hidden"></div>
          <h1 id="question" class="text-2xl text-left question py-3 px-4"></h1>
        </div>

        <div
          id="editor"
          class="flex-grow"
          onchange={evt => {
            changeHandler(evt);
          }}
          onkeydown={e => {
            if (e.ctrlKey && e.key === 's') {
              runHandler();
              e.preventDefault();
            }
          }}
        ></div>

        <div class="output" style="height: 40vh" id="outputdiv">
          <div
            class="w-full bg-gray-800 cursor-move text-bg-600 flex justify-center text-3xl h-4"
            style="line-height: 1px; cursor: ns-resize;"
            onmousedown={e => {
              dragging = true;
              document.body.style.cursor = 'ns-resize';
            }}
          ></div>
          <h2 class="text-3xl text-center">Output</h2>
          <h2
            id="output"
            class="flex-1 text-gray-700 text-center px-4 py-2 outputValue"
          ></h2>
        </div>
      </div>,
    );

    this.editor = ace.edit(this.el.children[0].childNodes[1]);
    this.editor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      highlightActiveLine: true,
      showPrintMargin: false,
      theme: 'ace/theme/tomorrow_night',
      mode: 'ace/mode/javascript',
      enableLiveAutocompletion: true,
    });

    this.editor.session.setMode('ace/mode/javascript');

    const changeHandler = evt => {
      this.data.solution = evt.target.value;
      updateData(this.data, this.data.index);
    };


    mount(this.el.children[1].firstChild.firstChild,codingArea );

    const runHandler = () => {
      let outValue = document.getElementById('output');

      try {
        let test_case = this.data.test_case;

        const val = eval(
          this.editor.getValue() +
            'solution(' +
            JSON.stringify(test_case) +
            ')',
        );
        if (JSON.stringify(val) === this.data.test_output)
          outValue.textContent = 'Correct Answer';
        else {
          outValue.textContent = 'Wrong Answer';
        }
      } catch (err) {
        outValue.textContent = err.message;
      }
    };

    window.onkeydown=(evt)=>{
      if(this.data.changeData===false)
        return;

      if(evt.ctrlKey&&evt.key==='s')
      {
        evt.preventDefault();
        Object.assign(this.data, codingArea.getData());
        this.data.changeData=false;
        updateData(this.data, this.data.index);
        this.update(this.data, this.data.index);
        codingArea.newProblem();
      }
    }


  }

  update(data, index) {
    this.data = { ...data };
    this.data.index = index;
    this.data.solution = `// Solution to Problem ${index + 1} \n\n ${
      data.solution
    }`;
    this.editor.setValue(this.data.solution, 1);
    this.el.children[1].firstChild.lastChild.textContent = this.data.problem;

    if(data.changeData)
    {
      this.el.children[1].firstChild.lastChild.classList.add("hidden");
      this.el.children[1].firstChild.firstChild.classList.remove("hidden");
      codingArea.update(data);
    }
    else
    {
      this.el.children[1].firstChild.lastChild.classList.remove("hidden");
      this.el.children[1].firstChild.firstChild.classList.add("hidden");
    }

  }
}
let updateInformation;

function updateData(data, index) {
  updateInformation(data, index);
}

const editorWindow = new Editor_window();
export default (...args) => {
  [updateInformation] = args;
  return editorWindow;
};
