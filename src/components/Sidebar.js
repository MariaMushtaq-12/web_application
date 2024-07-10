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
    <div className={`fixed top-[70px] right-0 h-[calc(100vh-60px)] shadow-md transition-width duration-300 overflow-hidden z-50 ${isCollapsed ? 'w-[40px]' : 'w-[250px]'} bg-gray-800`}>
      <div
        className="absolute top-[20px] right-[-20px] w-[40px] h-[40px] bg-gray-300 rounded-full shadow-sm flex justify-center items-center cursor-pointer"
        onClick={toggleSidebar}
      >
        {isCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
      </div>
      <div className={`p-5 flex flex-col items-center ${isCollapsed ? 'hidden' : 'block'}`}>
        <ul className="list-none p-0 m-0 w-full">
          <li className="relative mb-2.5 group">
            <button className="w-full text-left bg-green-600 text-white py-2.5 px-5 rounded cursor-pointer overflow-visible">
              Terrain Analysis
            </button>
            <ul className="right-40 absolute bg-white min-w-[200px] border border-gray-300 hidden group-hover:block z-100 ">
              {tools.filter(tool => tool.name === 'Viewshed' || tool.name === 'Line of Sight' || tool.name === 'Elevation Profile').map(tool => (
                <li key={tool.id} className="border-b border-gray-300 last:border-b-0">
                  <button className="w-full text-left py-2 px-5 cursor-pointer hover:bg-gray-200" onClick={() => handleToolClick(tool.name)}>
                    {tool.icon} {tool.name}
                  </button>
                </li>
              ))}
            </ul>
          </li>
          <li className="relative mb-2.5 group">
            <button className="w-full text-left bg-green-600 text-white py-2.5 px-5 rounded cursor-pointer">
              Tools
            </button>
            <ul className="right-40 absolute bg-white min-w-[200px] border border-gray-300 hidden group-hover:block">
              {tools.filter(tool => tool.name === 'Buffer' || tool.name === 'Range Rings').map(tool => (
                <li key={tool.id} className="border-b border-gray-300 last:border-b-0">
                  <button className="w-full text-left py-2 px-5 cursor-pointer hover:bg-gray-200" onClick={() => handleToolClick(tool.name)}>
                    {tool.icon} {tool.name}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;