import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TaskRepository) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
    return this.tasksRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const record = this.tasksRepository.findOne({ where: { id } });
    if (!record) {
      throw new NotFoundException();
    }

    return record;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTask(id: string): Promise<void>{
    const result = await this.tasksRepository.delete(id);
    
    if (result.affected === 0){
        throw new NotFoundException(`Task with ID "${id}" not found!`);
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task>{
    const task = await this.getTaskById(id);

    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }
}