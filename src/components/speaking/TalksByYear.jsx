import React from 'react';
import styled from '../../utils/styled';
import TalkList from './TalkList';

function ToggleButton({children, onClick}) {
  return <button onClick={onClick} className="text-xs bg-transparent cursor-pointer border-0 p-0 mb-4 hover:underline focus:underline text-purple-300 hover:text-purple-700 focus:text-purple-700">
    {children}
  </button>
}

const TalkYearContainer = styled('div', '');
const ListContainer = styled('div', '');
const TalkYear = styled('h2', 'mb-2 inline-block mr-2 text-base font-bold text-gray-900 tracking-wide');

function TalksByYear({year, list, showDefault}) {
  const [collapsed, setCollapsed] = React.useState(typeof showDefault === 'undefined' ? true : showDefault);
  const toggle = () => { setCollapsed(!collapsed) };

  return <ListContainer>
    <TalkYearContainer>
      <TalkYear>{year}</TalkYear>
      {!collapsed && <ToggleButton onClick={toggle}>Hide talks</ToggleButton>}
    </TalkYearContainer>
    <TalkList talks={list} collapsed={collapsed} />
    {collapsed && <ToggleButton onClick={toggle}>Show {year} talks</ToggleButton>}
  </ListContainer>
}

export default TalksByYear;