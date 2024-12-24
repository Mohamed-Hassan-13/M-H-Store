import { faPlus, faUsers ,faCartShopping, faPen, faUserPlus, faCirclePlus, faProductHunt, faCartArrowDown } from "@fortawesome/free-solid-svg-icons";


export const links =[
    {
        name:'User',
        path:'users',
        icon:faUsers,
        role:'1995'
    },
    {
        name:'Add Users',
        path:'user/add',
        icon:faUserPlus,
        role:'1995'
    },
    {
        name:'Categories',
        path:'categores',
        icon:faCartShopping,
        role:['1999','1995']
    },
    {
        name:'Add Categories',
        path:'categore/add',
        icon:faCirclePlus,
        role:['1999','1995']
    },
    {
        name:'Products',
        path:'products',
        icon:faCartArrowDown,
        role: ['1995','1999']
    },
    {
        name:'Add Product',
        path:'product/add',
        icon:faPlus,
        role: ['1995','1999']
    },
]