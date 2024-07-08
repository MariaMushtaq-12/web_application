import React, { useState } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaEye, FaLine, FaChartLine, FaCircle, FaCompass } from 'react-icons/fa';
import '../css/Sidebar.css';

const Sidebar = ({ activeTool, setActiveTool }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleToolClick = (tool) => {
    setActiveTool(activeTool === tool ? null : tool);
  };

  const tools = [
    { id: 1, name: 'Viewshed', icon: <FaEye />, description: 'Analyze the visible area from a point' },
    { id: 2, name: 'Line of Sight', icon: <FaLine />, description: 'Calculate the line of sight between two points' },
    { id: 3, name: 'Elevation Profile', icon: <FaChartLine />, description: 'Generate an elevation profile along a path' },
    { id: 4, name: 'Buffer', icon: <FaCircle />, description: 'Create a buffer zone around a feature' },
    { id: 5, name: 'Range Rings', icon: <FaCompass />, description: 'Create range rings around a point' }
  ];

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="toggle-button" onClick={toggleSidebar}>
        {isCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
      </div>
      <div className={`sidebar-content ${isCollapsed ? 'collapsed' : ''}`}>
        <ul>
          <li className="dropdown">
            <button className="dropdown-btn">Terrain Analysis</button>
            <ul className="dropdown-content">
              {tools.filter(tool => tool.name === 'Viewshed' || tool.name === 'Line of Sight' || tool.name === 'Elevation Profile').map(tool => (
                <li key={tool.id}><button onClick={() => handleToolClick(tool.name)}>{tool.icon} {tool.name}</button></li>
              ))}
            </ul>
          </li>
          <li className="dropdown">
            <button className="dropdown-btn">Tools</button>
            <ul className="dropdown-content">
              {tools.filter(tool => tool.name === 'Buffer' || tool.name === 'Range Rings').map(tool => (
                <li key={tool.id}><button onClick={() => handleToolClick(tool.name)}>{tool.icon} {tool.name}</button></li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
