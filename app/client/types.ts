export type issuetype = {
  id: string;
  title: string;
  createdAt: Date;
  repository: { id: string; name: string; owner: string };
  number?: number; // Mark as optional
  state?: string; // Mark as optional
};

export type Repository = {
  id: string;
  owner: string;
  name: string;
  userId: string;
};

export type RepositoryState = Repository[] | { error: string };