import React from 'react';
import { Link } from 'react-router-dom'
import classNames from 'classnames';

import '../styles/app-header.scss';


const AppHeader = ({ isAbsolute }) => {
  const rowClasses = classNames('row app-header-row', {
    'row-absolute': isAbsolute
  });
  const buttonClasses = classNames('app-span', {
    'button-absolute': isAbsolute
  });
  return (
    <div className={rowClasses}>
      <div className="col s6 app-header-cols">
        <span className="app-title">Stu's Movie Web App</span>
      </div>
      <div className="col s6">
        <span className={buttonClasses}><Link to="/">Home</Link></span>
      </div>
    </div>
  );
};

export default AppHeader;
