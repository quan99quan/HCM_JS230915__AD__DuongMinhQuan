import { Store } from '@/store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { memberAction } from '@/store/slices/member.slice';
import { categoryAction } from '@/store/slices/category.slice'
// type Menu = {
//     title: string,
//     child: {
//         title: string,
//         link: string | null,
//         fn: any | null
//     }[]
// }

export default function Container({ menuState }: {
    menuState: boolean
}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [menus, setMenus] = useState<any[]>(
        [
            {
                title: 'Example Parent Menu',
                child: [
                    {
                        title: "Child Menu Fn",
                        link: null,
                        fn: () => {
                            console.log("ok")
                        }
                    },
                    {
                        title: "Child Menu",
                        link: "product/list",
                        fn: null
                    }
                ]
            }
        ]
    )
    const memberStore = useSelector((store: Store) => store.memberStore)

    useEffect(() => {
        if (memberStore.data?.permission) {
            let permisionList = JSON.parse(memberStore.data?.permission) || []

            let memberPermission = [];
            let logPermission = [];
            let categoryPermission = [];
            for(let i in permisionList) {
                if(permisionList[i].split(":")[1] == "member") {
                    memberPermission.push(permisionList[i].split(":")[0])
                }
                if(permisionList[i].split(":")[1] == "log") {
                    logPermission.push(permisionList[i].split(":")[0])
                }
                if(permisionList[i].split(":")[1] == "category") {
                    categoryPermission.push(permisionList[i].split(":")[0])
                }
            }
                    /* category Menu */
            let categoryMenu: any = {
                title: 'Category',
                child: []
            }
            for (let i in categoryPermission) { // ["r", "c", "u", "d"]
                if(categoryPermission[i] == "r") {
                    categoryMenu.child.push(
                        {
                            title: "List",
                            link: "category/list",
                            fn: null
                        }
                    )
                }
            }
            /* Log Menu */
            let logMenu: any = {
                title: 'Log',
                child: []
            }
            for (let i in logPermission) { // ["r", "c", "u", "d"]

                if(logPermission[i] == "c") {
                    logMenu.child.push(
                        {
                            title: "Add",
                            link: "log/all",
                            fn: null
                        }
                    )
                }

                if(logPermission[i] == "r") {
                    logMenu.child.push(
                        {
                            title: "List",
                            link: "log/all",
                            fn: null
                        }
                    )
                }
            }

            /* Member Menu */
            let memberMenu: any = {
                title: 'Member',
                child: memberStore.data?.role == "master" ? [
                    {
                        title: "Online List",
                        link: "member/online-list",
                        fn: null
                    }
                ] : []
            }
            for (let i in memberPermission) { // ["r", "c", "u", "d"]

                if(memberPermission[i] == "c") {
                    memberMenu.child.push(
                        {
                            title: "Add",
                            link: "member/list",
                            fn: ()=>{
                                navigate('member/list')
                                dispatch(memberAction.setDisplayAddForm())
                            }
                        }
                    )
                }

                if(memberPermission[i] == "r") {
                    memberMenu.child.push(
                        {
                            title: "List",
                            link: "member/list",
                            fn: null
                        }
                    )
                }
            }

            let menu:any[] = [];
            if(logMenu.child.length != 0) menu.push(logMenu)
            if(memberMenu.child.length != 0) menu.push(memberMenu)
            if(categoryMenu.child.length != 0) menu.push(categoryMenu)
            setMenus([...menus, ...menu])
        }
    }, [memberStore.data])
    return (
        <div className='admin_container'>
            <div className={`${menuState && "hidden"} menu_bar`}>
                {
                    menus.map(item => (
                        <div key={Date.now() * Math.random()} className='menu_item'>
                            <button onClick={(e) => {
                                let targetEl = (e.target as any).parentNode.querySelector('.menu_item_sub');
                                if (targetEl.classList.length > 1) {
                                    targetEl.classList.remove("hidden")
                                } else {
                                    targetEl.classList.add("hidden")
                                }
                            }} className='menu_item_main btn btn-dark'>
                                {item.title}
                            </button>
                            <ul className='menu_item_sub'>
                                {
                                    item.child?.map((supItem: any) => (<li onClick={() => {
                                        if (supItem.fn) {
                                            supItem.fn()
                                        } else {
                                            if (supItem.link) navigate(supItem.link)
                                        }
                                    }} key={Date.now() * Math.random()}>{supItem.title}</li>))
                                }
                            </ul>
                        </div>
                    ))
                }
            </div>
            <div className='content'>
                <div className='history'>
                    <span>Home</span>
                    <span>Admin</span>
                    <span>Product</span>
                </div>
                <div className='content_body'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}