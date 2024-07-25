// import React, { useState } from 'react';
// import { FaAngleDoubleLeft, FaAngleDoubleRight, FaEye, FaLine, FaChartLine, FaCircle, FaCompass } from 'react-icons/fa';
// import { motion, AnimatePresence } from 'framer-motion';
// //import '../css/Sidebar.css';

// const itemVariants = {
//   open: {
//     opacity: 1,
//     y: 0,
//     transition: { type: 'spring', stiffness: 300, damping: 24 },
//   },
//   closed: {
//     opacity: 0,
//     y: 20,
//     transition: { duration: 0.2 },
//   },
// };

// const menuVariants = {
//   open: {
//     clipPath: 'inset(0% 0% 0% 0% round 10px)',
//     transition: {
//       type: 'spring',
//       bounce: 0,
//       duration: 0.7,
//       delayChildren: 0.3,
//       staggerChildren: 0.05,
//     },
//   },
//   closed: {
//     clipPath: 'inset(10% 50% 90% 50% round 10px)',
//     transition: {
//       type: 'spring',
//       bounce: 0,
//       duration: 0.3,
//     },
//   },
// };

// const Sidebar = ({ activeTool, setActiveTool }) => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState(null);

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   const handleToolClick = (tool) => {
//     setActiveTool(activeTool === tool ? null : tool);
//   };

//   const handleDropdownToggle = (dropdown) => {
//     setOpenDropdown(openDropdown === dropdown ? null : dropdown);
//   };

//   const tools = [
//     { id: 1, name: 'Viewshed', icon: <FaEye />, description: 'Analyze the visible area from a point' },
//     { id: 2, name: 'Line of Sight', icon: <FaLine />, description: 'Calculate the line of sight between two points' },
//     { id: 3, name: 'Elevation Profile', icon: <FaChartLine />, description: 'Generate an elevation profile along a path' },
//     { id: 4, name: 'Buffer', icon: <FaCircle />, description: 'Create a buffer zone around a feature' },
//     { id: 5, name: 'Range Rings', icon: <FaCompass />, description: 'Create range rings around a point' },
//   ];

//   return (
//     <div className={`fixed top-[70px] left-0 h-[calc(100vh-60px)] shadow-md transition-width duration-300 overflow-hidden z-50 ${isCollapsed ? 'w-[40px]' : 'w-[250px]'} bg-gray-800`}>
//       <div
//         className="relative w-[40px] h-[40px] bg-gray-300 rounded-full shadow-sm flex justify-center items-center cursor-pointer"
//         onClick={toggleSidebar}
//       >
//         {isCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
//       </div>
//       <div className={`p-5 flex flex-col items-center ${isCollapsed ? 'hidden' : 'block'}`}>
//         <ul className="list-none p-0 m-0 w-full">
//           <li
//             className="relative mb-2.5 group flex-grow"
//             onMouseEnter={() => handleDropdownToggle('terrainAnalysis')}
//             onMouseLeave={() => handleDropdownToggle(null)}
//           >
//             <motion.button
//               whileTap={{ scale: 0.97 }}
//               className="w-full text-left bg-green-600 text-white py-2.5 px-5 rounded cursor-pointer overflow-visible"
//               onClick={() => handleDropdownToggle('terrainAnalysis')}
//             >
//               Terrain Analysis
//               <motion.div
//                 variants={{
//                   open: { rotate: 180 },
//                   closed: { rotate: 0 },
//                 }}
//                 transition={{ duration: 0.2 }}
//                 style={{ originY: 0.55 }}
//               >
//                 <svg width="15" height="15" viewBox="0 0 20 20">
//                   <path d="M0 7 L 20 7 L 10 16" />
//                 </svg>
//               </motion.div>
//             </motion.button>
//             <AnimatePresence>
//               {openDropdown === 'terrainAnalysis' && (
//                 <motion.ul
//                   initial="closed"
//                   animate="open"
//                   exit="closed"
//                   variants={menuVariants}
//                   className="absolute left-1/2 transform -translate-x-1/2 top-full bg-white min-w-[200px] border border-gray-300 z-50 overflow-y-auto max-h-60"
//                   style={{ pointerEvents: openDropdown === 'terrainAnalysis' ? 'auto' : 'none' }}
//                 >
//                   {tools
//                     .filter((tool) => tool.name === 'Viewshed' || tool.name === 'Line of Sight' || tool.name === 'Elevation Profile')
//                     .map((tool) => (
//                       <motion.li key={tool.id} variants={itemVariants} className="border-b border-gray-300 last:border-b-0">
//                         <button className="w-full text-left py-2 px-5 cursor-pointer hover:bg-gray-200" onClick={() => handleToolClick(tool.name)}>
//                           {tool.icon} {tool.name}
//                         </button>
//                       </motion.li>
//                     ))}
//                 </motion.ul>
//               )}
//             </AnimatePresence>
//           </li>
//           <li
//             className="relative mb-2.5 group flex-grow"
//             onMouseEnter={() => handleDropdownToggle('tools')}
//             onMouseLeave={() => handleDropdownToggle(null)}
//           >
//             <motion.button
//               whileTap={{ scale: 0.97 }}
//               className="w-full text-left bg-green-600 text-white py-2.5 px-5 rounded cursor-pointer"
//               onClick={() => handleDropdownToggle('tools')}
//             >
//               Tools
//               <motion.div
//                 variants={{
//                   open: { rotate: 180 },
//                   closed: { rotate: 0 },
//                 }}
//                 transition={{ duration: 0.2 }}
//                 style={{ originY: 0.55 }}
//               >
//                 <svg width="15" height="15" viewBox="0 0 20 20">
//                   <path d="M0 7 L 20 7 L 10 16" />
//                 </svg>
//               </motion.div>
//             </motion.button>
//             <AnimatePresence>
//               {openDropdown === 'tools' && (
//                 <motion.ul
//                   initial="closed"
//                   animate="open"
//                   exit="closed"
//                   variants={menuVariants}
//                   className="absolute left-1/2 transform -translate-x-1/2 top-full bg-white min-w-[200px] border border-gray-300 z-50 overflow-y-auto max-h-60"
//                   style={{ pointerEvents: openDropdown === 'tools' ? 'auto' : 'none' }}
//                 >
//                   {tools
//                     .filter((tool) => tool.name === 'Buffer' || tool.name === 'Range Rings')
//                     .map((tool) => (
//                       <motion.li key={tool.id} variants={itemVariants} className="border-b border-gray-300 last:border-b-0">
//                         <button className="w-full text-left py-2 px-5 cursor-pointer hover:bg-gray-200" onClick={() => handleToolClick(tool.name)}>
//                           {tool.icon} {tool.name}
//                         </button>
//                       </motion.li>
//                     ))}
//                 </motion.ul>
//               )}
//             </AnimatePresence>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;  

import React, { useState } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaEye, FaLine, FaChartLine, FaCircle, FaCompass, FaMapMarkedAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 },
  },
};

const menuVariants = {
  open: {
    clipPath: 'inset(0% 0% 0% 0% round 10px)',
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  closed: {
    clipPath: 'inset(10% 50% 90% 50% round 10px)',
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.3,
    },
  },
};

const Sidebar = ({ activeTool, setActiveTool }) => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Set initial state to true for collapsed sidebar
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleToolClick = (tool) => {
    setActiveTool(activeTool === tool ? null : tool);
  };

  const handleDropdownToggle = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const tools = [
    { id: 1, name: 'Viewshed', icon: <FaEye />, description: 'Analyze the visible area from a point' },
    { id: 2, name: 'Line of Sight', icon: <FaLine />, description: 'Calculate the line of sight between two points' },
    { id: 3, name: 'Elevation Profile', icon: <FaChartLine />, description: 'Generate an elevation profile along a path' },
    { id: 4, name: 'Buffer', icon: <FaCircle />, description: 'Create a buffer zone around a feature' },
    { id: 5, name: 'Range Rings', icon: <FaCompass />, description: 'Create range rings around a point' },
    { id: 6, name: 'Point of Interest', icon: <FaMapMarkedAlt/>, description: 'Showing places with in a buffer region' },
  ];

  
  return (
    <>
      <div
        className={`absolute left-[5px] top-[80px] w-[40px] h-[40px] bg-gray-400 hover:bg-green-600 hover:text-gray-900 rounded-full shadow-sm flex justify-center items-center cursor-pointer z-50 ${isCollapsed ? '' : 'hidden'}`}
        onClick={toggleSidebar}
      >
        {isCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
      </div>
      <div className={`fixed top-[70px] left-0 h-[calc(100vh-60px)] shadow-md rounded transition-width duration-300 overflow-hidden z-40 ${isCollapsed ? 'w-[0px]' : 'w-[250px]'} bg-gray-600`}>
        {!isCollapsed && (
          <div
            className="relative w-[40px] h-[40px] bg-gray-300 hover:bg-green-500 rounded-full shadow-sm flex justify-center items-center cursor-pointer"
            onClick={toggleSidebar}
          >
            {isCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
          </div>
        )}
        <div className={`p-5 flex flex-col items-center ${isCollapsed ? 'hidden' : 'block'}`}>
          <ul className="list-none p-0 m-0 w-full">
            <li
              className="relative mb-2.5 group flex-grow"
              onMouseEnter={() => handleDropdownToggle('terrainAnalysis')}
              onMouseLeave={() => handleDropdownToggle(null)}
            >
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="w-full text-left bg-green-600 text-white py-2.5 px-5 rounded cursor-pointer overflow-visible"
                onClick={() => handleDropdownToggle('terrainAnalysis')}
              >
                Terrain Analysis
                <motion.div
                  variants={{
                    open: { rotate: 180 },
                    closed: { rotate: 0 },
                  }}
                  transition={{ duration: 0.2 }}
                  style={{ originY: 0.55 }}
                >
                  <svg width="15" height="15" viewBox="0 0 20 20">
                    <path d="M0 7 L 20 7 L 10 16" />
                  </svg>
                </motion.div>
              </motion.button>
              <AnimatePresence>
                {openDropdown === 'terrainAnalysis' && (
                  <motion.ul
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={menuVariants}
                    className="absolute left-1/2 transform -translate-x-1/2 top-full bg-white min-w-[200px] border border-gray-300 z-50 overflow-y-auto max-h-60"
                    style={{ pointerEvents: openDropdown === 'terrainAnalysis' ? 'auto' : 'none' }}
                  >
                    {tools
                      .filter((tool) => tool.name === 'Viewshed' || tool.name === 'Line of Sight' || tool.name === 'Elevation Profile')
                      .map((tool) => (
                        <motion.li key={tool.id} variants={itemVariants} className="border-b border-gray-300 last:border-b-0">
                          <button className="w-full text-left py-2 px-5 cursor-pointer bg-gray-300 hover:bg-green-500" onClick={() => handleToolClick(tool.name)}>
                            {tool.icon} {tool.name}
                          </button>
                        </motion.li>
                      ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
            <li
              className="relative mb-2.5 group flex-grow"
              onMouseEnter={() => handleDropdownToggle('tools')}
              onMouseLeave={() => handleDropdownToggle(null)}
            >
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="w-full text-left bg-green-600 text-white py-2.5 px-5 rounded cursor-pointer"
                onClick={() => handleDropdownToggle('tools')}
              >
                Tools
                <motion.div
                  variants={{
                    open: { rotate: 180 },
                    closed: { rotate: 0 },
                  }}
                  transition={{ duration: 0.2 }}
                  style={{ originY: 0.55 }}
                >
                  <svg width="15" height="15" viewBox="0 0 20 20">
                    <path d="M0 7 L 20 7 L 10 16" />
                  </svg>
                </motion.div>
              </motion.button>
              <AnimatePresence>
                {openDropdown === 'tools' && (
                  <motion.ul
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={menuVariants}
                    className="absolute left-1/2 transform -translate-x-1/2 top-full bg-white min-w-[200px] border border-gray-300 z-50 overflow-y-auto max-h-60"
                    style={{ pointerEvents: openDropdown === 'tools' ? 'auto' : 'none' }}
                  >
                    {tools
                      .filter((tool) => tool.name === 'Buffer' || tool.name === 'Range Rings'|| tool.name ==='Point of Interest')
                      .map((tool) => (
                        <motion.li key={tool.id} variants={itemVariants} className="border-b border-gray-300 last:border-b-0">
                          <button className="w-full text-left py-2 px-5 cursor-pointer bg-gray-300 hover:bg-green-500" onClick={() => handleToolClick(tool.name)}>
                            {tool.icon} {tool.name}
                          </button>
                        </motion.li>
                      ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
