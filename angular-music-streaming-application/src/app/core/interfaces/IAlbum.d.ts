export interface IAlbum {
    id: number;
    createdOn: Date;
    lastUpdatedOn: Date;
    name: string;
    type: string;
    performer: string;
    genre: string;
    coverImageUrl: string;
    numberOfTracks: number;
    description: string;
    releaseDate: Date;
    popularity: string;
}