import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon, List, Segment } from 'semantic-ui-react';
import { createTask } from '../../actions/tasks';
import { IApplicationState } from '../../models';
import { ITask } from '../../models/task';
import { CreateTask } from './CreateTask';

import './index.scss';

export const Tasks = () => {
  const [isCreateModalOpen, toggleCreateModal] = React.useState(false);
  const dispatch = useDispatch()

  const handleCreateNewTask = (values: ITask) => {
    dispatch(createTask(values));
    toggleCreateModal(false);
  }

  const tasksbranch = useSelector((state: IApplicationState) => state.tasks);

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
          <List.Item>
            <List.Content>
              <List.Header>Snickerdoodle</List.Header>
              An excellent companion
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>Poodle</List.Header>A poodle, its pretty basic
        </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>Paulo</List.Header>
          He's also a dog
        </List.Content>
          </List.Item>
        </List>
      </Segment>
    </div>
  )
}