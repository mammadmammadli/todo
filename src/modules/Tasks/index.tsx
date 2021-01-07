import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon, List, Message, Segment } from 'semantic-ui-react';
import { createTask } from '../../actions/tasks';
import { IApplicationState } from '../../models';
import { ITask } from '../../models/task';
import { mapStatusToText } from '../../utils';
import { CreateTask } from './CreateTask';

import './index.scss';

export const Tasks = () => {
  const [isCreateModalOpen, toggleCreateModal] = React.useState(false);
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

  console.log(list)
  return (
    <div>
      <div className='page__title'>
        <span>List</span>
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
          {list.length > 0 ? list.map(({
            description,
            deadline,
            priority,
            responsibleUser,
            startDate,
            status,
            title,
          }) => {
            const listType: any = {}
            if (priority === 'LOW') {
              listType['info'] = true;
            } else if (priority === 'HIGH') {
              listType['negative'] = true;
            } else {
              listType['warning'] = true;
            }

            return (
              <List.Item>
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