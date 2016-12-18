export class Task {
    id: number;
    team_id: number;
    creator_id: number;
    performer_id: number;
    text: string;
    deadline: string;
    status: number;
    points: number;

    constructor(
        id: number, 
        team: number, 
        creator: number, 
        performer: number, 
        text: string, 
        deadline: string, 
        status: number, 
        points: number
    ) {
        this.id = id;
        this.team_id = team;
        this.creator_id = creator;
        this.performer_id = performer;
        this.text = text;
        this.deadline = deadline;
        this.status = status;
        this.points = points;
    }
}