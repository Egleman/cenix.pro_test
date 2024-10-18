export interface IPost {
  id: string,
  name: string
}

export interface IPostsStore {
  posts: IPost[]
  processing: boolean,
  currentPage: number,
  itemsPerPage: number,
  searchWord: string
}
