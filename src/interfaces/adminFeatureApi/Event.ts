export interface Event {
    eventId: string;
    title: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    startTime?: Date;
    endTime?: Date;
    category: string;
    location?: string;
    imageUrl?: string;
    createdDate?: Date;
  }