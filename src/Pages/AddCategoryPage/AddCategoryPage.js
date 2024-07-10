import React from 'react'
import MySideBar from '../../Components/MySideBar/MySideBar'
import AddCategory from '../../Components/AddCategory/AddCategory'

const AddCategoryPage = () => {
  return (
    <div className='flex'>
        <div>
            <MySideBar/>
        </div>

        <div className='w-[100%]'>
            <AddCategory/>
        </div>
    </div>
  )
}

export default AddCategoryPage
