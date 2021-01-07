import { ITask } from "../models/task";

export const mockTasks: ITask[] = [
  {
    deadline: '24.12.1997',
    description: 'Lorem impsum',
    priority: 'LOW',
    responsibleUser: 'Mammad',
    startDate: '25.12.1998',
    status: 'TODO',
    title: 'Lolll'
  },
  {
    deadline: '24.12.1997',
    description: 'Lorem impsum',
    priority: 'MEDIUM',
    responsibleUser: 'Mammad',
    startDate: '25.12.1998',
    status: 'TODO',
    title: 'asdasdasd'
  },
  {
    deadline: '24.12.1997',
    description: 'Lorem impsum',
    priority: 'HIGH',
    responsibleUser: 'Mammad',
    startDate: '25.12.1998',
    status: 'DONE',
    title: '1231231'
  },
  {
    deadline: '24.12.1997',
    description: 'Lorem impsum',
    priority: 'HIGH',
    responsibleUser: 'Mammad',
    startDate: '30.12.1998',
    status: 'IN_PROGRESS',
    title: 'lmaoo'
  },
]