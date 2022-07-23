export interface IAlbum {
    id: number;
    name: string;
    type: string;
    performer: string;
    coverImageUrl: string;
    numberOfTracks: number;
    description: string;
    releaseDate: Date;
    popularity: string;
    genres: string[];
}