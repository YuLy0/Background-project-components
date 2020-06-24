import React from 'react';
import { Input, Form } from 'antd';
import PropTypes from 'prop-types';
import './index.less'

const FormItem = Form.Item;
const classPrexif = 'editable-table'
const cx = s => `${classPrexif}-${s}`

class EditableCell extends React.Component {
  //在子组件中用于说明context接收的数据类型
  static contextTypes= {
    form: PropTypes.object
  }

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
          })(
            <Input placeholder="请输入"/>
          )}
          </FormItem>
        ) : (
            children
        )}
      </td>
    )
  }

  render () {
    return <>{this.renderCell()}</>
  }
}

export default EditableCell