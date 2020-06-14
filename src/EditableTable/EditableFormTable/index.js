import React from 'react';
import { Popconfirm, Form, Table, Button, message } from 'antd';
import PropTypes from 'prop-types';
import './index.less'

const classPrexif = 'editable-table'
const cx = s => `${classPrexif}-${s}`

class EditableTable extends React.Component {
  static propTypes = {
    tableData: PropTypes.array,
    columns: PropTypes.array,
    submmit: PropTypes.func,
    // editableCell: PropTypes.object
  }
  static defaultProps = {
    tableData: [],
    columns: []
  }

  constructor (props) {
    super(props);
    this.state = {
      data: [...this.props.tableData],
      editingKey: '',
    };
    this.columns = [
      ...this.props.columns,
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <button
                onClick={() => this.save(record.key)}
                className={cx('smallBtn')}
                type="button"
              >
                保存
              </button>
              <Popconfirm
                title="确定取消更改吗?"
                onConfirm={() => this.cancel(record.key)}
              >
                <button className={cx('smallBtn')} type="button">
                  取消
                </button>
              </Popconfirm>
              <Popconfirm
                title="确定删除吗?"
                onConfirm={() => this.delete(record.key)}
              >
                <button type="button">删除</button>
              </Popconfirm>
            </span>
          ) : (
            <button
              type="button"
              disabled={editingKey !== ''}
              onClick={() => this.edit(record.key)}
            >
              编辑
            </button>
          );
        },
      },
    ];
  }

    isEditing = record => {
      const { editingKey } = this.state;
      return record.key === editingKey;
    };

    cancel = key => {
      if (key.length > 6) {
        const { data } = this.state;
        const newData = data;
        newData.splice(data.length - 1, 1);
        this.setState({ data: newData, editingKey: key });
      }
      this.setState({ editingKey: '' });
    };

    delete = key => {
      const { data } = this.state;
      const newData = data;
      const index = newData.findIndex(item => key === item.key);
      newData.splice(index, 1);
      this.setState({ data: newData, editingKey: '' });
    };

    save (key) {
      const { form } = this.props
      form.validateFields((error, row) => {
        if (error) {
          return;
        }
        const { data } = this.state;
        const newData = [...data];
        const index = newData.findIndex(item => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
        } else {
          newData.push(row);
        }
        console.log(row)
        this.setState({ data: newData, editingKey: '' });
      });
    }

    edit = key => {
      this.setState({ editingKey: key });
    };

    handleAdd = () => {
      const { data, editingKey } = this.state;
      if (editingKey !== '') {
        message.error('请先保存');
        return;
      }
      const key = new Date().toString();
      const row = {
        key,
        app: '',
        prod: '',
      };
      const newData = data;
      newData.splice(data.length, 1, row);
      this.setState({ data: newData, editingKey: key });
    }

    handleSubmit=() => {
      const { data, editingKey } = this.state
      if (editingKey !== '') {
        message.error('请先保存');
        return;
      }

      const submitData = data.map(item => ({
        app: item.app,
        prod: item.prod
      }))

      if (!data) {
        return false
      } else if (data.length === 1) {
        const { app, prod } = data[0]
        if (!app && !prod) {
          message.error('您没有提交任何数据');
          return false
        }
      }

      this.props.onSubmmit(submitData)
    }

    render () {
      const { editableCell } = this.props

      const components = {
        body: {
          cell: editableCell,
        },
      };

      const columns = this.columns.map(col => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: record => ({
            record,
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.isEditing(record)
          }),
        };
      });
      const { data } = this.state;
      const { form } = this.props;

      return (
        <div>
          <Button onClick={this.handleAdd} type="primary" className={cx('topBtn')}>
            添加一行
          </Button>
          <Table
            components={components}
            bordered
            dataSource={data}
            columns={columns}
            rowClassName="editable-row"
            pagination={false}
          />
          <div className={cx('box')}>
            <Button onClick={this.handleSubmit} type="primary" className={cx('bottomBtn')}>
              提交
            </Button>
          </div>
        </div>
      );
    }
}

// const EditableFormTable = Form.create()(EditableTable);
export default EditableTable;
