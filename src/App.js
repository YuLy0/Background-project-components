import React from 'react'
import './App.less'
import EditableTable from './EditableTable/EditableFormTable/index'
const tableData = [{
  key: 0,
  app: '汪酱',
  prod: '旺旺',
},
{
  key: 1,
  app: '汪酱',
  prod: '旺旺',
},
{
  key: 2,
  app: '汪酱',
  prod: '旺旺',
}
]
class App extends React.Component{
  submmit(res){
    console.log('submmitData',res)
  }

  render(){
    return (
      <div className={'text'}>
        <EditableTable tableData={tableData} submmit={this.submmit}/>
      </div>)
  }
}
export default App