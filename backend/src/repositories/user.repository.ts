import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasOneRepositoryFactory, juggler, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {User, UserCredentials, UserRelations, TodoList} from '../models';
import {UserCredentialsRepository} from './user-credentials.repository';
import {TodoListRepository} from './todo-list.repository';

export type Credentials = {
  email: string;
  password: string;
  role?: string
};

export class UserRepository extends DefaultCrudRepository<User,
  typeof User.prototype.id,
  UserRelations> {

  public readonly userCredentials: HasOneRepositoryFactory<UserCredentials, typeof User.prototype.id>;

  public readonly todoLists: HasManyRepositoryFactory<TodoList, typeof User.prototype.id>;

  constructor(
    @inject('datasources.postgresql') dataSource: juggler.DataSource,
    @repository.getter('UserCredentialsRepository')
    protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>, @repository.getter('TodoListRepository') protected todoListRepositoryGetter: Getter<TodoListRepository>,
  ) {
    super(User, dataSource);
    this.todoLists = this.createHasManyRepositoryFactoryFor('todoLists', todoListRepositoryGetter,);
    this.registerInclusionResolver('todoLists', this.todoLists.inclusionResolver);
    this.userCredentials = this.createHasOneRepositoryFactoryFor('userCredentials', userCredentialsRepositoryGetter);
    this.registerInclusionResolver('userCredentials', this.userCredentials.inclusionResolver);
  }

  async findCredentials(
    userId: typeof User.prototype.id,
  ): Promise<UserCredentials | undefined> {
    try {
      return await this.userCredentials(userId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}