export type Repository = {
  id: string;
  name: string;
  owner: string;
  userId: string;
  issues: {
    id: string;
    title: string;
    createdAt: Date;
    number: number;
    state: string;
  }[];
};

export type RepositoryState = Repository[] | { error: string };
