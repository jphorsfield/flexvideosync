import SyncClient from 'twilio-sync';
import EventEmitter from 'event-emitter-es6';

const tokenUrl = 'URL-VALUE-HERE';
const jobListName = 'SYNC-LIST-NAME';

let instance;
export default class Jobs extends EventEmitter {
    static shared() {
        instance = instance || new Jobs();
        return instance;
    }

    constructor() {
        super();
        this.client = undefined;
        this.jobList = undefined;
        this.jobs = undefined;
    }

    async init() {
        if (this.jobs) {
            console.log('In the this.jobs bit');
            return this.jobs;
        }

        const resp = await fetch(tokenUrl);
        if (!resp.ok) {
            throw new Error('Could not fetch token');
        }
        const {token} = await resp.json();
        this.client = new SyncClient(token, { logLevel: 'debug'});
        this.jobList = await this.client.list(jobListName);
        this.jobs = await this.fetchJobs();
        this.addEventListeners();
        return this.jobs;
    }

    async updateStatus(job, status) {
        const idx = this.jobs.findIndex(item => item.number === job.number);
        this.jobs[idx] = { ...jobListName, status};
        this.emit('updated', {jobs: this.jobs});
        return this.jobList.update(job.number, { status });
    }

    async fetchJobs() {
        const page = await this.jobList.getItems({ pageSize: 20});
        return page.items.map(this.converItemToJob);
    }

    addEventListeners() {
        this.jobList.on('itemAdded', evt => {
            const item = evt.item.data;
            this.jobs = [...this.jobs, this.converItemToJob(item)];
            this.emit('updated', { jobs: this.jobs });
        });
        this.jobList.on('itemUpdated', evt => {
            const job = this.converItemToJob(evt.item.data);
            const idx = this.jobs.findIndex(existingItem => job.number === existingItem.number);
            const newJobs = [...this.jobs];
            newJobs[idx] = job;
            this.jobs = newJobs;
            this.emit('updated', { jobs: this.jobs});
        });
        this.jobList.on('itemRemoved', item => {
            const job = this.converItemToJob(item);
            console.log('Jobs list: '+JSON.stringify(this.jobs));
            const idx = this.jobs.findIndex(existingItem => job.status === existingItem.status);
            console.log('This is idx value: '+idx);
            const newJobs = [...this.jobs];
            newJobs.splice(idx, 1);
            this.jobs = newJobs;
            this.emit('updated', { jobs: this.jobs });
        });        
    }

    converItemToJob(item) {
        return {
            number: item.index,
            job: item.value.job,
            status: item.value.status,
            contact: item.value.contact
        };
    }
}