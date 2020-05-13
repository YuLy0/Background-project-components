import React from 'react'

import './index.less'
import {
  CLOUD_IMG, HEADER_TEXT,
  LIGHT_IMG, HEART_IMG,
  DOTS_IMG
} from './common'
const classPrefix = 'valentine-header'
const cx = s => `${classPrefix}-${s}`

export default class ValentineHeader extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      alpha: 0, // 水平
      beta: 0, // 前后
      gamma: 0, // 左右
    }
  }

  componentDidMount() {
    window.addEventListener('deviceorientation', this.deviceorientationChange, false)
  }

  lastX = 0
  lastY = 0
  lastGamma = 0
  lastbBeta = 0

  // @setThrottle(300, { leading: true, trailing: false })
  deviceorientationChange=(event) => {
    let { beta, gamma } = event;
    beta = Math.round(beta)
    gamma = Math.round(gamma)
    const r = 20
    let X = Math.round(gamma / 90 * r)
    let Y = Math.round(beta / 180 * r - 5)
    if (this.lastGamma < -50 || this.lastGamma > 50) {
      X = this.lastX
    }
    if (this.lastbBeta < -50 || this.lastbBeta > 50) {
      Y = this.lastY
    }

    this.cloud.style.transform = `translate(${X * 2}px, ${Y * 2}px)`
    this.text.style.transform = `translate(${X * 3}px, ${Y * 3}px)`
    this.light.style.transform = `translate(${X * 4}px, ${Y * 4}px)`
    this.heart.style.transform = `translate(${X * 6}px, ${Y * 6}px)`
    this.dots.style.transform = `translate(${X * 7}px, ${Y * 7}px)`

    this.lastX = X
    this.lastY = Y
    this.lastGamma = gamma
    this.lastbBeta = beta
  }

  render() {
    return <header className={classPrefix} >
      <img
        className={cx('cloud')}
        src={CLOUD_IMG}
        ref={el => (this.cloud = el)}
        alt=''
      />
      {/* <img
        className={cx('text')}
        src={HEADER_TEXT}
        ref={el => (this.text = el)}
        alt=''
      /> */}
      <img
        className={cx('light')}
        src={LIGHT_IMG}
        ref={el => (this.light = el)}
        alt=''
      />
      <img
        className={cx('heart')}
        src={HEART_IMG}
        ref={el => (this.heart = el)}
        alt=''
      />
      <img
        className={cx('dots')}
        src={DOTS_IMG}
        ref={el => (this.dots = el)}
        alt=''
      />
    </header>
  }
}
