export type ImageCreate = {
    url: string;
};

export type Image = {
    url: string;
    author: string;
    likes: string[];
    id: string;
};

export type Author = {
    login: string;
    token: string;
};
