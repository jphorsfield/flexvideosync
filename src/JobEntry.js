import React from 'react';
import './JobEntry.css';

const JobEntry = ({ job, onEscalate, onComplete}) => {
    return (
        <div className='job-entry'>
            <div className='job-details'>
                <h4>
                    Job #{job.number} - Status: {job.status}
                </h4>
                <p>{job.job}</p>
            </div>
            <div className='job-options'>
            <button id='complete-button' onClick={() => onComplete(job)}>Complete Job</button>
            <button id='escalate-button' className='button-clear' onClick={() => onEscalate(job)}>Escalate Job</button>
            </div>
        </div>
    );
};

export default JobEntry;