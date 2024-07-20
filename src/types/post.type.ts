export type Comment = {
    content: string;
    responder_id: string;
    userImgUrl: string;
    username: string;
  };
  export type Post = {
    _id?: string;
    imgUrl: string;
    content: string;
    owner?: string;
    comment?: Comment[];
    userImgUrl?: string;
    username?: string;
  };