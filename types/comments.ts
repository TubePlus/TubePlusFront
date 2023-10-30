export interface CommentProps
  {
  id: number;
  postId: number;
  commenterUuid: string;
  commenterName: string;
  childCoount: number;
  parentId: number;
  replyContent: string;
  avatar: string;
  }
