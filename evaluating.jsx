import { el, mount, list, unmount, setAttr } from 'redom';
import { default as EditorWindow } from './editor_window.jsx';
import { default as Tabs } from './tab_list.jsx';

class Main_window {
  constructor() {
    let data = [
      {
        problem: 'Write a program to find sum a array of integers',
        test_case: [1 ,2 ,3 ,4 ,5],
        test_output: [15],
        solution: 'function solution() {return 0; }',
        active: true,
        changeData: false,
      },
      {
        problem: 'Write  program to find product of given numbers',
        test_case: [1, 2, 3],
        test_output: [6],
        solution: 'function solution() {return 0; }',
        active: false,
        changeData: false,
      },
    ];
    this.check = false;
    this.curr_tab = 0;
    this.el = el(
      'div',
      <div class="flex w-screen h-screen">
        <div id="firstSection" class="bg-gray-500 flex-grow"></div>
        <div class="hidden"></div>
      </div>,
    );

    const editorWindow = EditorWindow((windowData, ind) => {
      data[ind] = windowData;
    });

    mount(this.el.children[0].firstChild, editorWindow);

    const tabs = Tabs(data, (list, active) => {
      data = list;
      editorWindow.update(data[active], active);
      this.curr_tab=active;
    });

    mount(
      this.el.children[0].firstChild,
      tabs,
      this.el.children[0].firstChild.firstChild,
    );
    tabs.update(data);
    editorWindow.update(data[0], 0);

    document.onkeydown = evt => {
      if (evt.ctrlKey && evt.key === 'p' &&!evt.altKey) {
        evt.preventDefault();
        let newData = {
          problem: '',
          test_case: '',
          test_output: '',
          solution: 'function solution() {return 0; }',
          active: true,
          changeData: true
        };
        data[this.curr_tab].active=false;
        data.push(newData);
        tabs.update(data);
        this.curr_tab=data.length-1;
        editorWindow.update(newData, data.length-1);

      }

      else if(evt.ctrlKey && evt.key === 'p'&&evt.altKey)
      {
        data[this.curr_tab].changeData=true;
        editorWindow.update(data[this.curr_tab], this.curr_tab);
      }

      else if(evt.ctrlKey&&evt.altKey&&evt.key==='c'&&data.length>1)
      {
        data.splice(this.curr_tab, 1);
        if(this.curr_tab==data.length)
        {
          this.curr_tab=data.length-1;
        }
        data[this.curr_tab].active=true;
        tabs.update(data);
        editorWindow.update(data[this.curr_tab], this.curr_tab);

      }
    };
  }
}
const main_win = new Main_window();

mount(document.body, main_win);
