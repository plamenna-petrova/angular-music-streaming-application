import { IAlbum } from "../interfaces/IAlbum.interface";
import { Track } from "./track.model";

export class Album implements IAlbum {
    id!: number;
    createdOn!: Date;
    lastUpdatedOn!: Date;
    name!: string;
    type!: string;
    performer!: string;
    coverImageUrl!: string;
    numberOfTracks!: number;
    description!: string;
    releaseDate!: Date;
    popularity!: string;
    genres!: string[];
    tracks!: Track[];
}