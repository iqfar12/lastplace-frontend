import { defineConfig, OutputOptions } from 'orval';
import path from 'path';

const BASE_SERVICE_CONFIG_OUTPUT: OutputOptions = {
  client: 'react-query',
  mock: false,
  mode: 'tags-split',
  prettier: true,
};

export default defineConfig({
  lastplace: {
    output: {
      ...BASE_SERVICE_CONFIG_OUTPUT,
      override: {
        mutator: {
          path: './api/utils/lastplace-service.ts',
          name: 'lastplaceServiceRequest',
          alias: {
            utils: path.resolve(__dirname, './api/utils'),
          },
        },
      },
      schemas: 'api/generated/models',
      target: 'api/generated/services',
    },
    input: {
      target: './api/api.json',
    },
  }
});