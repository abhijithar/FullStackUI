export class Task {
    
    constructor(
        public task_Id: string,
        public project_Id: string,
        public task: string,
        public parentTask: boolean,
        public priority: string,
        public parentTask_Id: string,
        public startDate: string,
        public endDate: string,
        public user_Id: string,
        public status: string
    ) {}

}