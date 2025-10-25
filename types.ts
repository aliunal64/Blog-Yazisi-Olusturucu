
export interface BlogCriteria {
  topic: string;
  audience: string;
  tone: string;
  length: string;
  extraRequests: string;
}

export interface BlogPost {
  title: string;
  body: string;
}
