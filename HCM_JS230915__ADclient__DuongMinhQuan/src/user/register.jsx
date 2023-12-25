import React from 'react'
import './register.scss'
import api from '@services/apis';
import { Modal } from 'antd';
export default function register() {
    async function handleRegister(e) {
        e.preventDefault();
        console.log(e.target.username.value);
        const username = e.target.username.value;
        const password = e.target.password.value;
        if (!username || !password) {
            Modal.error({
                title: 'Error',
                content: 'Tên người dùng và mật khẩu là bắt buộc.'
            });
            return;
        }
        try {
            let newuser = {
                username,
                password
            }
            console.log(newuser);
            let result = await api.member.create(newuser);
            Modal.success({
                title: 'Notification',
                content: "đã tạo thành công",
                onOk() {
                    window.location.href = "/authen"
                }
            })

        } catch (err) {
            console.log("err", err);
        }

    }
    return (
        <div>
            <form onSubmit={(e) => handleRegister(e)}>
                <div className='box_authen'>
                    <div className='box-sign-in'>
                        <div>
                            <h3>Sign up</h3>
                        </div>
                        <div>
                            <label htmlFor="username">Name</label>
                            <br />
                            <input type="text" placeholder='Name' name="username" id='username' required />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <br />
                            <input type="password" placeholder='Password' name='password' id='password' required />
                        </div>
                        <div>
                            <button className="btn-sign-in" type='submit'>Sign Up</button>
                        </div>
                        <div className="checkbox-remember">
                            <p>Have an account ??</p>
                            <p style={{ cursor: "pointer" }} onClick={() => {
                                window.location.href = '/authen'
                            }}> Sign in</p>
                        </div>
                    </div >
                </div>
            </form >
        </div >
    )
}
