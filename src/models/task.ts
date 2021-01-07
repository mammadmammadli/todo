export interface ITask {
  id: number;
  title: string;
  description: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  status: "TODO" | "IN_PROGRESS" | "DONE";
  startDate: string;
  deadline: string;
  responsibleUser: string;
}
