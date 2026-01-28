import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

function Board({ data, onDragEnd, onEditTask }) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board-view">
        <div className="board">
          {data.columnOrder.map(columnId => {
            const column = data.columns[columnId];
            const tasks = column.taskIds
              .map(taskId => data.tasks[taskId])
              .filter(Boolean);

            return (
              <div key={column.id} className="column">
                <div className="column-header">
                  <div className="column-title-section">
                    <div className={`column-color ${columnId}`}></div>
                    <span className="column-title">{column.title}</span>
                    <span className="column-count">{tasks.length}</span>
                  </div>
                  <div className="column-actions">
                    <button className="icon-btn">⚙️</button>
                  </div>
                </div>

                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      className={`column-content ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                opacity: snapshot.isDragging ? 0.8 : 1
                              }}
                            >
                              <TaskCard 
                                task={task} 
                                onClick={() => onEditTask(task)}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
}

export default Board;
