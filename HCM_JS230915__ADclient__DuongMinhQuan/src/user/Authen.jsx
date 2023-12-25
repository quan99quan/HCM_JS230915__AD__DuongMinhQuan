import { useNavigate } from 'react-router-dom'
import React from 'react'
import './authen.scss'
import api from '@services/apis';
import { Modal } from 'antd';
export default function Authen() {
    const navigate = useNavigate()
    async function handleLogin(e) {
        e.preventDefault();
        if (!username || !password) {
            Modal.error({
                title: 'Error',
                content: 'vui lòng nhập đẩy đủ thông tin.'
            });
            return;
        }
        try {
            let newdata = {
                username: e.target.username.value,
                password: e.target.password.value
            }
            console.log(newdata);
            let result = await api.member.login(newdata)
            localStorage.setItem("userRole", result.data.data.data.role)
            Modal.success({
                title: "Notication",
                content: "Đăng nhập thành công",
                onOk: () => {
                    window.location.href = '/task'
                }
            })
        } catch (err) {

            Modal.error({
                title: 'Error',
                content: "lỗi"
            })
        }
    }
    return (
        < div className="img-background" >
            <form onSubmit={(e) => {
                handleLogin(e)
            }}>
                <div className='box_authen'>
                    <div className='box-sign-in'>
                        <div>
                            <h3>Sign in</h3>
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
                            <button className="btn-sign-in" type='submit'>Sign in</button>
                        </div>
                        <div className="checkbox-remember">
                            <p>
                                Not registered yet ?</p>
                            <p style={{ cursor: 'pointer' }} onClick={() => {
                                window.location.href = '/register'
                            }}>Sign up</p>
                        </div>
                    </div >

                </div>

            </form >
        </div >
    )
}
