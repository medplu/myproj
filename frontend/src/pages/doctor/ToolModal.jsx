import React from 'react';
import { FaTimes } from 'react-icons/fa';
import NotesComponent from './NotesComponent';
import CalendarComponent from './CalendarComponent';
import RemindersComponent from './RemindersComponent';
import PatientSearchComponent from './PatientsSearchComponent';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const ToolModal = ({ tool, onClose }) => {
  const renderToolContent = () => {
    switch (tool) {
      case 'Notes':
        return <NotesComponent />;
      case 'Calendar':
        return <CalendarComponent />;
      case 'Reminders':
        return <RemindersComponent />;
      case 'Patient Search':
        return <PatientSearchComponent />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold" data-tip data-for='toolTitle'>{tool}</h2>
          <button onClick={onClose} data-tip data-for='closeButton'>
            <FaTimes className="text-xl text-gray-700" />
          </button>
        </div>
        {renderToolContent()}
        <ReactTooltip id='toolTitle' place="top" effect="solid">
          {`This is the ${tool} tool`}
        </ReactTooltip>
        <ReactTooltip id='closeButton' place="top" effect="solid">
          Close this modal
        </ReactTooltip>
      </div>
    </div>
  );
};

export default ToolModal;
