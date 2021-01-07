interface IUser {
  name: string;
  surname: string;
}

export interface ITask {
  title: string;
  description: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  status: "TODO" | "IN_PROGRESS" | "DONE";
  startDate: Date;
  deadline: Date;
  responsibleUser: IUser;
}
