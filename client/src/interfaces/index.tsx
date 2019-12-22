export interface IMockProviderObject {
  request?: {
    query?: string;
    mutation?: string;
    variables?: object;
  };
  result?: {
    data: object;
    errors?: [];
  };
  error?: object;
}

export type IMockProvider = IMockProviderObject[];
