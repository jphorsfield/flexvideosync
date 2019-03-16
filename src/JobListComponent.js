import React, {Component} from 'react';
import 'milligram/dist/milligram.css';
import Jobs from './jobs';
import JobEntry from './JobEntry';

export default class JobList extends React.Component {

    constructor(props, ctx) {
        super(props, ctx);
        this.finishJob = this.finishJob.bind(this);
        this.escalateJob = this.escalateJob.bind(this);
        this.updateJobs = this.updateJobs.bind(this);
        this.jobService = Jobs.shared();
        this.jobService.on('updated', this.updateJobs);
        this.state = {
            jobs: []
        };
    }

    async componentWillMount() {
        //console.log('In component will mount: '+JSON.stringify(this.jobService));
        const jobs = await this.jobService.init();
        this.setState({ jobs });
    }

    updateJobs({ jobs }) {
        this.setState({ jobs });
    }

    finishJob(job) {
        console.log('Job Finished');
        this.jobService.updateStatus(job, 'finished');
    }

    escalateJob(job) {
        console.log('Job status is: '+job.contact);
        this.jobService.updateStatus(job, 'escalated');
    }


    render() {
        return(
            <div role="main" class="css-177tl0d">
                <span class>CallOut Queue</span>
                <div className='job-list'>
                    {this.state.jobs.map(entry => (
                        <JobEntry
                            key={entry.number}
                            job={entry}
                            onEscalate={this.escalateJob}
                            onComplete={this.finishJob}
                        />
                    ))}
                </div>
            </div>
        );
    }
}