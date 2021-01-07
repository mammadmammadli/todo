import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Icon, List, Message, Segment } from 'semantic-ui-react';
import { createTask } from '../../actions/tasks';
import { IApplicationState } from '../../models';
import { ITask } from '../../models/task';
import { filterOptions, mapStatusToText, priorityWeight, statusWeight } from '../../utils';
import { CreateTask } from './CreateTask';
import './index.scss';

export const Tasks = () => {
  const [isCreateModalOpen, toggleCreateModal] = React.useState(false);
  const [filter, setFilter] = React.useState<string>()
  const dispatch = useDispatch()

  const handleCreateNewTask = (values: ITask) => {
    const newData: ITask = {
      ...values,
      status: 'TODO',
    }
    dispatch(createTask(newData));
    toggleCreateModal(false);
  }

  const { list } = useSelector((state: IApplicationState) => state.tasks);

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
  }, [filter])

  const filteredList = filterAction()

  return (
    <div>
      <div className='page__title'>
        <h1>List</h1>
      </div>
      <div className="d-flex v-center space-between">
        <Form>
          <Form.Group widths='equal'>
            <Form.Select
              fluid
              options={filterOptions}
              placeholder='Filter'
              onChange={(_, { value }) => setFilter(value as string)}
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
                    <div>
                      <p>Start date: {startDate}</p>
                      <p>Deadline: {deadline}</p>
                    </div>
                    <div className='d-flex v-center h-right'>
                      <select>
                        <option value="">Las</option>
                      </select>
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