import { api } from '@/apis';
import './authen.scss'
import { Modal } from 'antd';

import { useState } from 'react';

export default function Authen() {
    const [load, setLoad] = useState(false);
    return (
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <form onSubmit={async (e: React.FormEvent) => {
                        e.preventDefault();
                        try {
                            let data = {
                                loginId: (e.target as any).loginId.value,
                                password: (e.target as any).password.value
                            }
                            setLoad(true)
                            let res = await api.member.login(data);
                            setLoad(false)
                            localStorage.setItem("token", res.data.token);
                            Modal.success({
                                title: "Thông báo",
                                content: "Thành công xác thực, di chuyển tới trang quản trị!",
                                onOk: () => {
                                    window.location.href = "/"
                                }
                            })
                        } catch (err: any) {
                            console.log("err", err)
                            setLoad(false)
                            Modal.warning({
                                title: "Thông báo",
                                content: err?.response?.data?.message || "Lỗi không rõ!"
                            })
                        }
                    }} className="login">
                        <div className="login__field">
                            <i className="login__icon fas fa-user" />
                            <input
                                type="text"
                                className="login__input"
                                placeholder="login id"
                                name='loginId'
                            />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock" />
                            <input
                                type="password"
                                className="login__input"
                                placeholder="password"
                                name='password'
                            />
                        </div>
                        <button type='submit' className="button login__submit" style={{
                            position: 'relative'
                        }}>
                            <span className="button__text">Log In Now</span>
                            <i className="button__icon fas fa-chevron-right" />
                           
                        </button>
                    </form>
                    <div className="social-login">
                        <h3>ERM LMS</h3>
                        <div className="social-icons">
                            <a href="#" className="social-login__icon fab fa-instagram" />
                            <a href="#" className="social-login__icon fab fa-facebook" />
                            <a href="#" className="social-login__icon fab fa-twitter" />
                        </div>
                    </div>
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4" />
                    <span className="screen__background__shape screen__background__shape3" />
                    <span className="screen__background__shape screen__background__shape2" />
                    <span className="screen__background__shape screen__background__shape1" />
                </div>
            </div>
        </div>
    )
}
