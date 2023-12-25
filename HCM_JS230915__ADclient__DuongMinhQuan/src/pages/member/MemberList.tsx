import { Store } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import './memberList.scss'
import AddForm from './components/AddForm'
import { member, memberAction } from '@/store/slices/member.slice';
import { api } from '@/apis';
export default function MemberList() {
  const dispatch = useDispatch();
  const memberStore = useSelector((store: Store) => store.memberStore);
  const permissionItems = ["c", "r", "u", "d"];
  const permissionNames = ["log", "member", "category"]
  const [memberSelectData, setMemberSelectData] = useState<null | member>(null)

  function checkPer(tableName: string, perName: string, memberPerString: string) {
    let memberPer = (JSON.parse(memberPerString) as string[]);

    let perCheck = memberPer.find(item => item.split(':')[0] == perName && item.split(':')[1] == tableName);
    if (!perCheck) return false

    return true
  }


  useEffect(() => {
    if (!memberStore.list) return
    setMemberSelectData(memberStore.list.find(item => item.id == memberSelectData?.id) || null)
  }, [memberStore.list])
  return (
    <div className='member_app_box'>
      <div>
        <h2>Member List</h2>
        <Table striped bordered hover variant="white">
          <thead>
            <tr>
              <th>#</th>
              <th>Login Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Email Status</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Permission</th>
              <th>Tool</th>
            </tr>
          </thead>
          <tbody>
            {
              memberStore.list?.map(item => (
                <tr key={Date.now() * Math.random()}>
                  <td>{item.id}</td>
                  <td>{item.loginId}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.emailConfirm.toString()}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.role}</td>
                  <td>
                    <button className='btn btn-primary' onClick={() => setMemberSelectData(item)}>Show</button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                       
                        api.member.block()
                          .then(res => {
                             console.log(res);
                             
                          })
                          .catch(err => {
                            console.log("err", err);
                          });
                      }}
                     
                    >
                      {/* {item.block ? 'Unblock' : 'Block'} */}aaaaaaaa
                    </button>
                  </td>
                </tr>
              ))
            }

            <Modal title="Permission" open={memberSelectData != null} onOk={() => setMemberSelectData(null)} onCancel={() => setMemberSelectData(null)}>
              {
                memberSelectData &&
                <>
                  <h3>Member Permissions: </h3>
                  <Table striped bordered hover variant="white">
                    <thead>
                      <tr>
                        <th>Table</th>
                        <th>Create</th>
                        <th>Read</th>
                        <th>Update</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        permissionNames.map(tableName => (
                          <tr key={Date.now() * Math.random()}>
                            <td>{tableName}</td>
                            {permissionItems.map((perName) => (
                              <td onClick={() => {
                                let data = {
                                  permission: !checkPer(tableName, perName, memberSelectData.permission) ?
                                    JSON.stringify([...(JSON.parse(memberSelectData.permission)), `${perName}:${tableName}`]) :
                                    JSON.stringify((JSON.parse(memberSelectData.permission)).filter((item: any) => item != `${perName}:${tableName}`))
                                }
                                api.member.changePermission(memberSelectData.id, data)
                                  .then(res => {
                                    if (res.status == 200) dispatch(memberAction.updateList(res.data.data))
                                  })
                                  .catch(err => {
                                    console.log("err", err)
                                  })
                              }} style={{ cursor: "pointer" }} key={Date.now() * Math.random()}>{
                                  checkPer(tableName, perName, memberSelectData.permission) ? '✅' : '❌'
                                }</td>
                            ))}
                          </tr>
                        ))
                      }
                    </tbody>
                  </Table>
                </>
              }
            </Modal>

          </tbody>
        </Table>
      </div>
      {
        memberStore.displayAddForm && <AddForm />
      }
    </div>
  )
}