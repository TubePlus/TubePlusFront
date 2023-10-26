export interface post {
  id: number;
  isvoted: boolean;
  boardid: number;
  title: string;
  contents: string;
  votecounts: number;
  authoruuid: string;
  authorname: string;
  avatar: string;
}