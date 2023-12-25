import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react';
import './task.scss';
import api from '@services/apis';
import { Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { randomId, getDateInfo } from '@mieuteacher/meomeojs';
import { Modal } from 'antd';
import { todoAction } from '../../store/slices/todolist.slice';
export default function Task() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const todotStore = useSelector(store => store.todoStore);
    const role = localStorage.getItem("userRole");
    const newRole = role === "false" ? "member" : role === "true" ? "admin" : role;
    console.log("Đây là vai trò:", newRole);
    const [editingTask, setEditingTask] = useState({
        id: null,
        name: '',
    });
    async function handleAddTodo(e) {
        if (newRole === "member") {
            return;
        } else {
            e.preventDefault();
            try {
                let newlist = {
                    name: e.target.name.value,
                };
                console.log(newlist);
                let result = await api.todo.create(newlist);
                console.log("result", result);
                Modal.confirm({
                    title: "thông tin",
                    content: "đã tạo",
                    onOk: () => {
                        dispatch(todoAction.addTodo(result.data.data));
                        e.target.name.value = "";
                    },
                });
            } catch (err) {
                console.log(err);
            }
        }
    }
    async function handleUpdate(e, id) {
        e.preventDefault();
        try {
            let updateNew = {
                name: editingTask.name,
            };
            console.log("updateNew", updateNew);
            let result = await api.todo.update(id, updateNew);
            console.log("result", result);
            Modal.confirm({
                title: "notification",
                content: "Bạn muốn thay đổi không ?",
                onOk: () => {
                    dispatch(todoAction.updateTodo({ id: id, data: updateNew }));

                    setEditingTask({ name: "" });
                },
            });
        } catch (err) {
            console.log("Không update được", err);
        }
    }
    const handleDeleteDo = (todo) => {
        Modal.confirm({
            title: 'Thông báo',
            content: 'bạn có muốn xóa công việc này không ?',
            async onOk() {
                try {
                    await api.todo.delete(todo.id);
                    dispatch(todoAction.delete(todo.id));
                    alert("đã xóa");
                } catch (err) {
                    console.log("Lỗi khi xóa công việc", err);
                }
            },
            onCancel() {
            },
        });
    }
    return (
        <div>
            <div>
                <div className='button'>
                    <button onClick={() => {
                        Modal.confirm({
                            title: "Xác nhận",
                            content: "Bạn chắc chắn muốn đăng xuất!",
                            onOk: () => {
                                localStorage.removeItem("userRole")
                                window.location.href = '*'
                            }
                        })
                    }}  >Login/Register</button>
                </div>
                <h3>Task List</h3>

                <div className='box'>
                    <form onSubmit={(e) => {
                        handleAddTodo(e);
                    }}>
                        <div className='header-box'>
                            <div className='main-box-btn-add'>

                                {editingTask.id === null ?
                                    <input type='text' id='name' name='name' disabled={newRole === "member"}></input> :
                                    <input type='text' id='name' name='name' value={editingTask.name} onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}></input>}
                            </div>
                            <div>
                                {editingTask.id == null ?
                                    <button type='submit' disabled={newRole === "member"}>add task</button> :
                                    <button onClick={(e) => handleUpdate(e, editingTask.id)} disabled={newRole === "member"}>Save
                                    </button>}
                            </div>
                        </div>
                        <div>
                            <h3>Task</h3>
                        </div>
                    </form>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Task Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    todotStore.data?.map((todo, index) => {
                                        return (
                                            <tr key={todo.id}>
                                                <td>{todo.name}</td>
                                                <td>
                                                    <button onClick={() => handleDeleteDo(todo)} disabled={newRole === "member"}>Delete</button>
                                                    <button onClick={() => setEditingTask({ id: todo.id, name: todo.name })} disabled={newRole === "member"}> Edit </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
