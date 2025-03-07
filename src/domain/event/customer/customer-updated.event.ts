import EventInterface from "../@shared/event.interface";

export default class CustomerUpdatedEvent implements EventInterface{
    dateTimeOccurred: Date;
    eventData: any;
    
    constructor(eventData: any){
        this.eventData = eventData;
        this.dateTimeOccurred = new Date();
    }
}