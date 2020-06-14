import React from 'react'
import './App.less'
import EditableTable from './EditableTable/EditableFormTable/index'
import GyroscopeAnimationDemo from './GyroscopeAnimationDemo/index'
import { tableData, editableTableColumns } from './constants'
import ZooExample from './views/zooExample'
import EditableCell from './components/EditableCell'
import { Form } from 'antd'


export const EditableContext = React.createContext()
class App extends React.Component{
  submmit(res){
    console.log('submmitData',res)
  }

  render(){
    const { form } = this.props
    return (
      <div className={'text'}>
        <EditableTable 
          columns={editableTableColumns}
          tableData={tableData} 
          submmit={this.submmit}
          editableCell={<EditableCell from={form}/>}
        />
        {/* <GyroscopeAnimationDemo /> */}
        {/* <ZooExample/> */}
      </div>)
  }
}
export default Form.create()(App)