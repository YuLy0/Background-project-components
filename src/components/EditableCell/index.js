import React from 'react';
import { Input, Form, Select } from 'antd';
import './index.less'

const FormItem = Form.Item;
const appList = [{id: 1, name: '汪酱'}, {id: 1, name: '旺汪'}]
const prodsList = [{id: 2, name: '旺财'}, {id: 1, name: '旺鸡'}]
const classPrexif = 'editable-table'
const cx = s => `${classPrexif}-${s}`

export default
class EditableCell extends React.Component {
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
              {/* {
              prodsList.map(item =>
                <Select.Option
                  key={item.id}
                  value={`${item.name}`}

                >
                  { item.name }
                </Select.Option>
              )
            } */}
            </Input>
          )
        default:
          return null
      }
    };

    renderCell = ({ getFieldDecorator }) => {
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
      return <div>{this.renderCell}</div>;
    }
}


