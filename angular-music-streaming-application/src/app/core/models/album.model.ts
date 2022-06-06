import { Track } from "./track.model";

export class Album {
    id!: number;
    createdOn!: Date;
    lastUpdatedOn!: Date;
    name!: string;
    type!: string;
    performer!: string;
    genre!: string;
    numberOfTracks!: number;
    description!: string;
    dateOfRelease!: Date;
    popularity!: string;
    tracks!: Track[];
}