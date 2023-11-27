export interface communityType {
    communityId: number
    bannerImage: string
    ownerUuid: string
    profileImage: string
    youtubeName: string
    communityName: string
    description: string
    communityMemberCount: number
    createdDate: string
    updatedDate: string
}
  
export interface boardType {
    boardId: number;
    boardName: string;
    boardType: string;
    boardDescription: string;
    visible: boolean;
    limitTime: string;
    erase?: boolean;
}