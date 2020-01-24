import { el, mount, list, unmount, setAttr } from 'redom';
class Tab {
  constructor() {
    this.el = el(
      'div',{class:"flex-1"},
      <div >
        <h1 class="tabData"></h1>
      </div>,
    );
    this.el.firstChild.onclick = evt => {
      updateTabs(this.el.id);
    };
  }
  update(data, index, items, context) {
    setAttr(this.el, {
      id: `tab-${index}`,
    }); 
    setAttr(this.el.firstChild, {
      class: `cursor-pointer ${
        data.active ? 'tabs_style2' : 'tabs_style'
      } px-4 py-2 inline-block tabbs`,
    });
    this.el.firstChild.firstChild.textContent = `Problem ${index + 1}`;
  }
}

let tabs = list(
  'div.overflow-x-auto .flex .flex-no-wrap .bg-gray-200 .tab_list',
  Tab,
);

let data;
let updateData;

function updateTabs(active) {
  const activeIndex = parseInt(active.replace('tab-', ''), 10);
  data = data.map((obj, index) => ({ ...obj, active: index === activeIndex }));
  updateData(data, activeIndex);
  tabs.update(data);
}

export default (...args) => {
  [data, updateData] = args;
  return tabs;
};
