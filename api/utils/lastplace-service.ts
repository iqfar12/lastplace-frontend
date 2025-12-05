import { AxiosError, AxiosRequestConfig } from 'axios';

import { createClient } from './create-client';

const client = createClient();

export const lastplaceServiceRequest = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const { url, ...restOfConfig } = config;
  const prefixedUrl = url;
  const response = await client({
    url: prefixedUrl,
    ...restOfConfig,
    ...options,
  });
  return response?.data;
};

export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
