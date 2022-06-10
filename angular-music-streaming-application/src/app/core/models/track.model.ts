import { ITrack } from "../interfaces/ITrack.interface";
import { Album } from "./album.model";

export class Track implements ITrack {
    id!: number;
    createdOn!: Date;
    lastUpdatedOn!: Date;
    title!: string;
    duration!: number;
    performedLanguage!: string;
    isTrending!: Boolean;
    albumId!: number;
    album!: Album;
}