import React from 'react';
import { Input, Form, Select } from 'antd';
import PropTypes from 'prop-types';
import './index.less'

const FormItem = Form.Item;
const appList = [{id: 1, name: '汪酱'}, {id: 1, name: '旺汪'}]
const prodsList = [{id: 2, name: '旺财'}, {id: 1, name: '旺鸡'}]
const classPrexif = 'editable-table'
const cx = s => `${classPrexif}-${s}`

class EditableCell extends React.Component {
  //在子组件中用于说明context接收的数据类型
  static contextTypes= {
    form: PropTypes.object
  }

    getInput = dataIndex => {
      switch (dataIndex) {
        case 'app':
          return (
            <Select
              allowClear
              showSearch
              placeholder="请选择app"
            >
              {
              appList.map(item =>
                <Select.Option
                  key={item.id}
                  value={`${item.name}`}
                >
                  { item.name }
                </Select.Option>
              )
            }
            </Select>
          )
        case 'prod':
          return (
            <Input
              placeholder="请编辑app"
            >
            </Input>
          )
        default:
          return <Input/>
      }
    };

    renderCell = () => {
      const {
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
      } = this.props;
      const {getFieldDecorator}  = this.context.form
      return (
        <td {...restProps}>
          {editing ? (
            <FormItem style={{ margin: 0 }}>
              {getFieldDecorator(dataIndex, {
                initialValue: record[dataIndex],
            })(this.getInput(dataIndex))}
            </FormItem>
          ) : (
              children
          )}
        </td>
      );
    };

    render () {
      return <>{this.renderCell()}</>
    }
}



export default EditableCell