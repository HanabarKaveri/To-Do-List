package com.example.todo.service;

import com.example.todo.model.Todo;
import com.example.todo.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {
    private final TodoRepository todorepo;
    public TodoService(TodoRepository todorepo){
        this.todorepo = todorepo;
    }

    public List<Todo> getALlTodos(){
        return todorepo.findAll();
    }

    public Todo addTodo(Todo todo){
        return todorepo.save(todo);
    }

    public Todo updateTodo(Long id, Todo todo) {
        Todo existingTodo = todorepo.findById(id).orElse(null);
        if (existingTodo != null) {
            existingTodo.setTask(todo.getTask());
            existingTodo.setCompleted(todo.isCompleted());
            return todorepo.save(existingTodo);
        }
        return null;
    }

    public void deleteTodo(Long id){
        todorepo.deleteById(id);
    }
}
