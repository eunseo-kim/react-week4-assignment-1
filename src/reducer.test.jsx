import reducer from './reducer';

import {
  updateTaskTitle,
  addTask,
  deleteTask,
} from './actions';

const initialState = {
  newId: 1,
  taskTitle: '',
  tasks: [],
};

describe('reducer', () => {
  describe('updateTaskTitle', () => {
    it('changes task title', () => {
      const { taskTitle } = reducer(
        {
          ...initialState,
          taskTitle: '',
        },
        updateTaskTitle('Task-1'),
      );

      expect(taskTitle).toBe('Task-1');
    });
  });

  describe('addTask', () => {
    it('adds a new task to tasks', () => {
      const { tasks } = reducer(
        {
          ...initialState,
          taskTitle: 'New Task',
        },
        addTask(),
      );

      expect(tasks[0].title).toBe('New Task');
      expect(tasks).toHaveLength(1);
    });

    it("doesn't add a new task when taskTitle is undefined", () => {
      const { tasks } = reducer(
        {
          ...initialState,
          taskTitle: undefined,
        },
        addTask(),
      );

      expect(tasks).toHaveLength(0);
    });
  });

  describe('deleteTask', () => {
    context('with an existing task id', () => {
      it('removes a task from tasks', () => {
        const { tasks } = reducer(
          {
            ...initialState,
            tasks: [
              { id: 1, title: 'first task' },
              { id: 2, title: 'second task' },
            ],
          },
          deleteTask(1),
        );

        expect(tasks).toHaveLength(1);
      });
    });

    context('with a non-existent task id', () => {
      it('removes a task from tasks', () => {
        const { tasks } = reducer(
          {
            ...initialState,
            tasks: [
              { id: 1, title: 'first task' },
              { id: 2, title: 'second task' },
            ],
          },
          deleteTask(100),
        );

        expect(tasks).toHaveLength(2);
      });
    });

    context('when undefined action called', () => {
      it('returns the original state', () => {
        const { tasks } = reducer(undefined, { type: undefined });

        expect(tasks).toHaveLength(0);
      });
    });
  });
});
