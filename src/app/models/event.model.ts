export interface FamilyEvent {
    allDay: boolean;
    title: string,
    start: Date
    end: Date,
    family: string,
    id: string
}

export interface FamilyEventResponse {
    status: string;
    data: {
      event: FamilyEvent;
    };
  }