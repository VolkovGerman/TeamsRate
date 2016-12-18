export class Team {
    id: number;
    name: string;
    descr: string;
    cr_name: string;
    cr_surname: string;
    cr_id: number;
    creator_id: number;

    constructor(id, name, descr) {
        this.id = id;
        this.name = name;
        this.descr = descr;
        this.cr_name = "";
        this.cr_surname = "";
        this.cr_id = -1; 
        this.creator_id = -1;
    }
} 