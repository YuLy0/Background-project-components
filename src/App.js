import React from 'react'
import './App.less'
import EditableTable from './EditableTable/EditableFormTable/index'
import GyroscopeAnimationDemo from './GyroscopeAnimationDemo/index'
import { tableData, editableTableColumns } from './constants'
import ZooExample from './views/zooExample'
import EditableCell from './components/EditableCell'
import { Form } from 'antd'
import { EditableContext } from './common';



// export const EditableContext = React.createContext()
class App extends React.Component{
  submmit(res){
    console.log('submmitData',res)
  }

  render(){
    const { form } = this.props

    return (
      <div className={'text'}>
        <EditableContext.Provider value={form}>
          <EditableTable 
          columns={editableTableColumns}
          tableData={tableData} 
          onSubmmit={this.submmit}
          editableCell={EditableCell}
          form={form}
          />
        </EditableContext.Provider>

        {/* <GyroscopeAnimationDemo /> */}
        {/* <ZooExample/> */}
      </div>)
  }
}
export default Form.create()(App)