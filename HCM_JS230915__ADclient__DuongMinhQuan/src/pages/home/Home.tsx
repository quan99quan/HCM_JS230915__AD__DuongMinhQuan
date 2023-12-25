import { useEffect, useState } from 'react'
// import Navbar from './components/Navbar'
import './home.scss'
import Container from './components/Container'
import { useDispatch, useSelector } from 'react-redux';
import { memberAction } from '@/store/slices/member.slice';
import { Store } from '@/store';
import { Socket, io } from 'socket.io-client';
import { Modal, message } from 'antd';
import { logAction } from '@/store/slices/log.slice';

import Verify from '../authen/verify/Verify';
import { createContext } from 'react';
import { categoryAction } from '@/store/slices/category.slice';
export const SocketContext = createContext<null | Socket>(null);
export default function Home() {
    const dispatch = useDispatch();
    const [menuState, setMenuState] = useState(false);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [first, setFirst] = useState(false);
    const [contactConfirmState, setContactConfirmState] = useState(false);
    const memberStore = useSelector((store: Store) => {
        return store.memberStore;
    });

    useEffect(() => {
        setSocket(io(`${import.meta.env.VITE_SOCKET_LOGIN_URL}`, {
            reconnectionDelayMax: 10000,
            auth: {
                token: String(localStorage.getItem("token"))
            }
        }))
    }, [])

    useEffect(() => {
        socket?.on('status', (res) => {
            if (!res.data) {
                if (res.invalidToken) {
                    localStorage.removeItem("token")
                    window.location.href = "/authen"
                }
                Modal.error({
                    title: "Thông báo",
                    content: res.message
                })
            } else {
                dispatch(memberAction.setData(res.data))
            }
        })

        socket?.on('logs', (data) => {
            dispatch(logAction.setData(data))
        })

        socket?.on('members', (data) => {
            dispatch(memberAction.setList(data))
        })

        socket?.on('category', (data) => {
            dispatch(categoryAction.setList(data))
        })

        socket?.on('online-list', (data) => {
            dispatch(memberAction.setOnlineList(data))
        })

        socket?.on("kick", (messageStr: string) => {
            Modal.confirm({
                title: "Thông báo",
                content: "Bạn bị logout bởi admin, reason: " + messageStr,
            })
            dispatch(memberAction.setData(null))
            localStorage.removeItem("token")
        });
    }, [socket])

    useEffect(() => {
        if (memberStore.data?.firstLoginState) {
            setFirst(true);
        }
    }, [memberStore.data])

    useEffect(() => {
        if (!memberStore.data) return
        if (!memberStore.data?.emailConfirm) {
            setContactConfirmState(true);
        }
    }, [memberStore.data])
    return (
        <SocketContext.Provider value={socket}>
            {
                (memberStore.data != null && !first && !contactConfirmState) && (
                    <div style={{ color: 'black' }} className='admin_page'>
                        {/* <Navbar data={memberStore.data} menuState={menuState} setMenuState={setMenuState} setSocket={setSocket} socket={socket} /> */}
                        <Container menuState={menuState} />
                    </div>
                )
            },
     
            {(contactConfirmState && !first) && <Verify />}
        </SocketContext.Provider>
    )
}