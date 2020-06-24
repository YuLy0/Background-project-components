import React from 'react'
import './App.less'
import EditableTable from './EditableTable/EditableFormTable/index'
import GyroscopeAnimationDemo from './GyroscopeAnimationDemo/index'
import { tableData, editableTableColumns } from './constants'
import ZooExample from './views/zooExample'
import EditableCell from './components/EditableCell'
import { Form } from 'antd'


class App extends React.Component{
  submmit(res){
    console.log('submmitData',res)
  }

  render(){
    const { form } = this.props

    return (
      <div className={'text'}>
        {/* <EditableTable 
          columns={editableTableColumns}
          tableData={tableData} 
          onSubmmit={this.submmit}
          editableCell={EditableCell}
          form={form}
          submmitButtonStyle={{color: 'black'}}
          addLineButtonStyle={{}}
        /> */}
        <ZooExample />
      </div>)
  }
}
export default Form.create()(App)