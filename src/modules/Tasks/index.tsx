import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Icon, List, Message, Segment } from 'semantic-ui-react';
import { createTask, updateTask } from '../../actions/tasks';
import { IApplicationState, TStatuses } from '../../models';
import { ITask } from '../../models/task';
import { filterOptions, mapStatusToText, priorityWeight, statusWeight } from '../../utils';
import { CreateTask } from './CreateTask';
import './index.scss';

type TFilter = 'priority' | 'date' | 'status';

export const Tasks = () => {
  const [isCreateModalOpen, toggleCreateModal] = React.useState(false);
  const [filter, setFilter] = React.useState<TFilter>('priority')
  const dispatch = useDispatch()
  const { list } = useSelector((state: IApplicationState) => state.tasks);

  const handleCreateNewTask = (values: ITask) => {
    const newData: ITask = {
      ...values,
      id: list.length,
      status: 'TODO',
    }
    dispatch(createTask(newData));
    toggleCreateModal(false);
  }

  const handleTaskStatusChange = (id: number, status: TStatuses) => {
    dispatch(updateTask(id, status))
  }

  const filterAction = React.useCallback(() => {
    return list.sort((first, second) => {
      let a;
      let b;
      if (filter === 'date') {
        a = new Date(first.deadline);
        b = new Date(second.deadline);
      } else if (filter === 'priority') {
        a = priorityWeight[first.priority]
        b = priorityWeight[second.priority]
      } else {
        a = statusWeight[first.status]
        b = statusWeight[second.status]
      }

      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    })
  }, [filter, list])

  const filteredList = filterAction()

  return (
    <div>
      <div className='page__title'>
        <h1>Todo List</h1>
      </div>
      <div className="d-flex v-center space-between">
        <Form>
          <Form.Group widths='equal'>
            <Form.Select
              fluid
              options={filterOptions}
              placeholder='Filter'
              onChange={(_, { value }) => setFilter(value as TFilter)}
            />
          </Form.Group>
        </Form>
        <div>
          <Button
            color={'green'}
            icon
            onClick={() => toggleCreateModal(true)}
          >
            <Icon name={'add'} />
          </Button>
        </div>
      </div>
      <CreateTask
        isOpen={isCreateModalOpen}
        onCloce={() => toggleCreateModal(false)}
        onSubmit={handleCreateNewTask}
      />
      <Segment>
        <List divided relaxed>
          {filteredList.length > 0 ? filteredList.map(({
            id,
            description,
            deadline,
            priority,
            responsibleUser,
            startDate,
            status,
            title,
          }, i) => {
            const listType: any = {}
            if (priority === 'LOW') {
              listType['info'] = true;
            } else if (priority === 'HIGH') {
              listType['negative'] = true;
            } else {
              listType['warning'] = true;
            }

            return (
              <List.Item key={i}>
                <List.Content>
                  <Message
                    className="list__item__content"
                    {...listType}
                  >
                    <div>
                      <Message.Header>{title} &mdash; {responsibleUser}</Message.Header>
                      <p>{description}</p>
                    </div>
                    <div className="d-flex h-v-center">
                      {priority}
                    </div>
                    <div className="d-flex h-v-center">
                      {mapStatusToText(status)}
                    </div>
                    <div className='d-flex h-v-center'>
                      <div>
                        <p>Start date: {startDate}</p>
                        <p>Deadline: {deadline}</p>
                      </div>
                    </div>
                    <div className='d-flex v-center h-right'>
                      <Form>
                        <Form.Group widths='equal'>
                          <Form.Select
                            fluid
                            options={[
                              { key: 't', text: 'Todo', value: 'TODO' },
                              { key: 'i', text: 'In progress', value: 'IN_PROGRESS' },
                              { key: 'd', text: 'Done', value: 'DONE' },
                            ]}
                            value={status}
                            placeholder='Filter'
                            onChange={(_, { value }) => {
                              handleTaskStatusChange(id, value as TStatuses)
                            }}
                          />
                        </Form.Group>
                      </Form>
                    </div>
                  </Message>
                </List.Content>
              </List.Item>
            )
          }) : (
              <div>not found</div>
            )}
        </List>
      </Segment>
    </div>
  )
}