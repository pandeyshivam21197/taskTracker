export interface IPostTask {
  startDate: string;
  endDate: string;
  title: string;
}

export const postTask = (
  actionPayload: IPostTask
): string => {
  const {startDate, endDate, title} = actionPayload;

  const payload = {
    query: `mutation{
    insert_tasks_one(object: {end_time: "${endDate}", start_time: "${startDate}", title: "${title}"}) {
      created_at
      end_time
      id
      start_time
      title
      updated_at
    }
  }`,
  };

  return JSON.stringify(payload);
};
