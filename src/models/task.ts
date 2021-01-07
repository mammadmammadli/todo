export interface ITask {
  title: string;
  description: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  status: "TODO" | "IN_PROGRESS" | "DONE";
  startDate: string;
  deadline: string;
  responsibleUser: string;
}
