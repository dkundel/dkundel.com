import React from 'react';
import TalkList from './TalkList';

function ToggleButton({children, onClick}) {
  return <button onClick={onClick} className="text-xs bg-transparent cursor-pointer border-0 p-0 mb-4 underline hover:underline focus:underline text-purple-300 dark:text-purple-100 hover:text-purple-700 focus:text-purple-700 dark:hover:text-purple-200 dark:focus:text-purple-200">
    {children}
  </button>
}

const classes = {
  list: 'border-l pl-8 py-2 ml-6 mb-2 border-purple-300 border-dashed',
  year: 'mb-2 rounded-full bg-purple-300 inline-block mr-2 text-sm font-light px-3 py-1 text-white tracking-wide',
};

function TalksByYear({year, list, showDefault}) {
  const [collapsed, setCollapsed] = React.useState(typeof showDefault === 'undefined' ? true : showDefault);
  const toggle = () => { setCollapsed(!collapsed) };

  return <div>
    <div>
      <h3 className={classes.year}>{year}</h3>
      {!collapsed && <ToggleButton onClick={toggle}>Hide talks</ToggleButton>}
    </div>
    <div className={classes.list}>
      <TalkList talks={list} collapsed={collapsed} />
      {collapsed && <ToggleButton onClick={toggle}>Show {year} talks</ToggleButton>}
    </div>
  </div>
}

export default TalksByYear;
