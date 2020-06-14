/**
 *  @name 面积折线图
 *  @author 喻灵
 *  @date 2020.5.8
 *
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _isEqual from 'lodash/isEqual'
import _isEmpty from 'lodash/isEmpty'
import { Spin } from 'antd'
import { Chart, Geom, Axis, Tooltip, Legend, View } from 'bizcharts'
import DataSet from '@antv/data-set'
import { lineColors, areaColors } from './common/index'

export default class MulLineChart extends Component {
  static propTypes = {
    chartData: PropTypes.array,
    fields: PropTypes.array,
    height: PropTypes.number,
    valueFormatter: PropTypes.string,
    multiple: PropTypes.bool,
    itemTickCount: PropTypes.number,
    itemFormatter: PropTypes.func,
    showLast: PropTypes.bool,
    legendPosition: PropTypes.string,
    padding: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.number,
    ]),
  }

  static defaultProps = {
    padding: [],
    chartData: [],
    fields: [],
    height: 240,
    valueFormatter: '', // Y轴格式化
    multiple: false, // 是否多折线
    itemTickCount: 0, // X轴刻度数
    itemFormatter: null, // X轴显示格式化
    showLast: false,
    legendPosition: 'top-center', // legend显示位置
  }

  shouldComponentUpdate (nextProps) {
    if (_isEqual(nextProps, this.props)) return false;
    return true
  }

  render () {
    const { chartData, fields, height, valueFormatter, multiple, itemTickCount, padding, itemFormatter, showLast, legendPosition } = this.props

    const {
      $common: { formatCash },
    } = this

    const ds = new DataSet()
    const dv = ds.createView().source(chartData || [])
    if (fields && fields.length) {
      dv.transform({
        type: 'fold',
        fields,
        // 展开字段集
        key: 'type',
        // key字段
        value: 'value', // value字段
      })
    }

    const cols = {
      item: {
        range: [0.05, 0.95],
        formatter: itemFormatter
      },
      value: {
        formatter: val => {
          return formatCash(val, ',') + valueFormatter
        },
        tickCount: 5,
        min: 0,
      },
    }

    if (itemTickCount) {
      cols.item.tickCount = itemTickCount
    }

    if (showLast) {
      if (chartData.length < 12) {
        cols.item.tickCount = chartData.length;
      }
    }

    const formatter = {
      formatter: (text, _, index) => {
        return text
      },
    }

    return !_isEmpty(chartData) ? (
      <Chart
        height={height}
        data={chartData.length ? dv : null}
        scale={cols}
        padding={40}
        forceFit
        placeholder="无数据"
      >
        {multiple && (
          <Legend position={legendPosition} marker="square" offsetY={-12} />
        )}
        <Axis
          name="item"
          label={showLast ? formatter : {}}
        />
        <Axis
          name="value"
        />
        <Tooltip />
        <Geom
          type="line"
          position="item*value"
          size={2}
          color={multiple ? ['type', lineColors] : 'rgba(191, 169, 234)'}
          shape="smooth"
        />
        <Geom
          type="point"
          position="item*value"
          size={3}
          shape={'hollowPoint'}
          color={multiple ? ['type', lineColors] : 'rgba(191, 169, 234)'}
        />

        <View
          height={height}
          data={chartData.length ? dv : null}
          scale={cols}
          forceFit
          placeholder="无数据"
        >
          <Geom
            type="area"
            position="item*value"
            size={2}
            color={['type', areaColors]}
            shape="smooth"
            tooltip={false}
          />
          <Axis
            name="value"
            position="right"
          />
        </View>

      </Chart>
    ) : (
      <div style={{ textAlign: 'center', height }}>
        <Spin style={{ marginTop: (height / 2) - 30 }} />
      </div>
    )
  }
}
