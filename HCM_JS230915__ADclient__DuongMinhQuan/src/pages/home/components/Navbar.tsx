
// import { Dropdown } from 'react-bootstrap';

// import { Modal } from 'antd';
// import { member, memberAction } from '@/store/slices/member.slice';
// import { useDispatch } from 'react-redux';
// import { Socket } from 'socket.io-client';
// export default function Navbar({ menuState, setMenuState, data, socket, setSocket}: {
//     menuState: boolean,
//     setMenuState: any,
//     data: member,
//     socket: Socket | null,
//     setSocket: any
// }) {

//     const dispatch = useDispatch()
//   return (
//     <nav>
//       <div className='logo'>
//         <img src={pictures.logo} />
//         <MenuBtn onClickFn={setMenuState} open={menuState} />
//       </div>
//       <div className='user'>
//         <Dropdown>
//           <Dropdown.Toggle variant="success" id="dropdown-basic">
//             <span>hi {data.firstName} {data.lastName}</span>
//             <img src={data.avatar} />
//           </Dropdown.Toggle>

//           <Dropdown.Menu>
//             <Dropdown.Item onClick={() => {
//               window.location.href = "/"
//             }}>Home Page</Dropdown.Item>
//             <Dropdown.Item onClick={() => {
//               Modal.confirm({
//                 title: "Logout",
//                 content: "Ok?",
//                 onOk: () => {
//                   window.localStorage.removeItem("token")
//                   dispatch(memberAction.setData(null))
//                   socket?.close();
//                   setSocket(null);
//                   window.location.href = "/authen"
//                 }
//               })
//             }}>Logout</Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//     </nav>
//   )
// }