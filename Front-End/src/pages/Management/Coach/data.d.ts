export type TableListItem = {
  id: number,  // modify
  coachId: string,  // modify
  name: string,  // modify
  iconUrl: string,  // modify
  briefIntroduction: string,  // modify
};


export type TableListSearchData = {
  page?: number;
  size?: number;
  id: number,  // modify
  name: string,  // modify
  briefIntroduction: string,  // modify
}

export type TableListPagination = {
  pageNumber: number;
  pageSize: number;
};

export type TableListData = {
  content: TableListItem[];
  totalElements: number;
  pageable: Partial<TableListPagination>;
};

export type TableListParams = {
  page?: number;
  size?: number;
  id: number,  // modify
  name: string,  // modify
  briefIntroduction: string,  // modify
};
