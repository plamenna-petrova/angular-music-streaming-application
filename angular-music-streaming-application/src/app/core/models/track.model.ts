import { Album } from "./album.model";

export class Track {
    id!: number;
    createdOn!: Date;
    lastUpdatedOn!: Date;
    title!: string;
    duration!: number;
    performedLanguage!: string;
    albumId!: number;
    album!: Album;
}