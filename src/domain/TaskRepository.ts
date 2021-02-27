import { ApiClient } from 'network/ApiClient';
import { IPostTask, postTask } from 'domain/graphQueries';
import { ITask } from 'domain/interfaces';

// TODO: (Shivam: give types)
class TaskRepository {
  private apiClient: any;

  public constructor() {
    this.apiClient = ApiClient;
  }

  public postTask = async (actionPayload: IPostTask): Promise<ITask> => {
    const response = await this.apiClient.post(postTask(actionPayload), {
        'Content-Type': 'application/json',
      });
    return response;
  };
}

const taskRepository = new TaskRepository();
export { taskRepository as TaskRepository };
