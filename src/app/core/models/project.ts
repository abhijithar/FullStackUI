export class Project {
    
    constructor(
        public project_Id: string,
        public project: string,
        public startDate: Date,
        public endDate: Date,
        public priority: string,
        public manager_id: string
    ) {}

}