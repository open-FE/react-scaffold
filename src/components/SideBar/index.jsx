import React, { Component } from 'react'
import { connect } from 'react-redux'
import { store, routerActions } from '../../store.js'
import PropTypes from 'prop-types'
import { Icon } from 'antd'

import { toggleSidebar, fetchThemeList } from '../../actions/sidebar'
import style from './style.less'

const mapStateToProps = (state) => ({
  list: state.sidebar.list,
  active: state.sidebar.active,
})

class Sidebar extends Component {
  componentDidMount() {
    let { dispatch } = this.props
    dispatch(fetchThemeList())
  }

  render() {
    const { list } = this.props
    return <div>
      <div className={`${style.sidebarBox} ${this.props.active ? style.showSidebar : ''}`}>
        <div className={style.tittle}>
          <Icon type="appstore-o" />
        </div>
        <div onClick={() => this.handleItemClick(2333)}>首页2333</div>
        <ul>
          {list.map((item) =>
            <li key={item.news_id} onClick={() => this.handleItemClick(item.news_id)}>
              {item.title}
            </li>
          )}
        </ul>
      </div>
      <div className={this.props.active ? style.sidebarMask : ''} onClick={() => this.handleToggleSidebar()}></div>
    </div>
  }

  handleToggleSidebar() {
    let { dispatch } = this.props
    dispatch(toggleSidebar())
  }

  handleItemClick(id) {
    if (id) {
      store.dispatch(routerActions.push(`/theme/${id}`))
      this.handleToggleSidebar()
    } else {
      store.dispatch(routerActions.push('/'))
      this.handleToggleSidebar()
    }
  }
}

Sidebar.propTypes = {
  list: PropTypes.array.isRequired,
  active: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(Sidebar)
