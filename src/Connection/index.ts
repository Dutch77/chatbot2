import {createConnection} from 'typeorm';
import typeOrmConfig from '../../ormconfig';

export const register = async () => {
  const connection = await createConnection(typeOrmConfig);

  return {
    connection,
  };
};
