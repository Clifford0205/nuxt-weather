import createRepository from '@/api/default/repository';

const repository = (ctx, inject) => {
  const repositoryWithAxios = createRepository(ctx);
  inject('api', repositoryWithAxios);
};

export default repository;
