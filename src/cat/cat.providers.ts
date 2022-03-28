import { Connection } from 'mongoose';
import { CatSchema } from './schema/catSchema';

export const catProviders = [
  {
    provide: 'Cat',
    useFactory: (connection: Connection) => connection.model('Cat', CatSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
