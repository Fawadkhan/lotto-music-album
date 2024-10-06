export type Album = {
    id: number;
    title: string;
    artist: string;
    cover: string;
    tracks: string[];
}

export type SortCriteria = 'title' | 'artist';