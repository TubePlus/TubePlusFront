export interface post {
  id: number;
  isVoted: boolean;
  boardId: number;
  title: string;
  contents: string;
  voteCounts: number;
  authorUuid: string;
  authorName: string;
  avatar: string;
}