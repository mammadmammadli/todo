import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Grid, Modal } from 'semantic-ui-react';
import { ITask } from '../../models/task';
import { priorities } from '../../utils';

interface IProps {
  onCloce: () => void;
  onSubmit: (values: ITask) => void;
  isOpen: boolean;
}

export const CreateTask = ({ isOpen, onCloce, onSubmit }: IProps): React.ReactElement => {
  const { handleSubmit, register } = useForm();

  return (
    <Modal
      onClose={onCloce}
      open={isOpen}
    >
      <Modal.Header>Create a new task</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Field>
            <label>Title</label>
            <input
              name="title"
              ref={register}
              placeholder="Title"
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <textarea
              name='description'
              ref={register}
              placeholder='Description'
            />
          </Form.Field>
          <Grid divided='vertically'>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Field>
                  <label>Start date</label>
                  <input
                    name='startDate'
                    ref={register}
                    type="date"
                    placeholder='Start date'
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>Deadline</label>
                  <input
                    name='deadline'
                    ref={register}
                    type="date"
                    placeholder='Deadline'
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Field>
                  <label >Proirity</label>
                  <select
                    name="priority"
                    ref={register}
                  >
                    {priorities.map(({ key, value, text }) => (
                      <option key={key} value={value}>{text}</option>
                    ))}
                  </select>
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label >Users</label>
                  <select
                    name="responsibleUser"
                    ref={register}
                  >
                    <option value={'mammad'}>Mammad</option>
                    <option value={'john'}>John doe</option>
                  </select>
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>

      <Modal.Actions>
        <Button color={'blue'} type='submit'>Create task</Button>
      </Modal.Actions>
        </Form>
      </Modal.Content>
    </Modal>
  )
}
