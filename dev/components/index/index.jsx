//author @huntbao
'use strict'

import './index.styl'
import React from 'react'
import SideTabStore from '../../stores/sidetabstore'
import ReqTabStore from '../../stores/reqtabstore'
import ReqTabConStore from '../../stores/reqtabconstore'
import Search from '../search/search.jsx'
import SideTab from '../sidetab/sidetab.jsx'
import History from '../history/history.jsx'
import Collections from '../collections/collections.jsx'
import ReqTab from '../reqtab/reqtab.jsx'
import ReqTabCon from '../reqtabcon/reqtabcon.jsx'
import ReqTabConAction from '../../actions/reqtabconaction'
import ReqBodyAction from '../../actions/reqbodyaction'

function getAppStates() {
    return Object.assign({}, SideTabStore.getAll(), ReqTabStore.getAll(), ReqTabConStore.getAll())
}

let Index = React.createClass({

    getInitialState: function () {
        return getAppStates()
    },

    componentDidMount() {
        SideTabStore.addChangeListener(this.onChange)
        ReqTabStore.addChangeListener(this.onChange)
        ReqTabConStore.addChangeListener(this.onChange)
    },

    componentWillUnmount() {
        SideTabStore.removeChangeListener(this.onChange)
        ReqTabStore.removeChangeListener(this.onChange)
        ReqTabConStore.removeChangeListener(this.onChange)
    },

    render() {
        return (
            <div className="main-wrap" onClick={this.hideDropdownMenu}>
                <div className="side">
                    <Search />
                    <SideTab sideTab={this.state.sideTab}/>
                    <History sideTab={this.state.sideTab}/>
                    <Collections sideTab={this.state.sideTab}/>
                </div>
                <div className="bd">
                    <ReqTab
                        tabs={this.state.reqTab.tabs}
                        activeIndex={this.state.reqTab.activeIndex}
                        />
                    <ReqTabCon
                        reqTabs={this.state.reqTab.tabs}
                        activeTabIndex={this.state.reqTab.activeIndex}
                        tabCons={this.state.reqTabCon}
                        />
                </div>
            </div>
        )
    },

    onChange() {
        this.setState(getAppStates())
    },

    hideDropdownMenu() {
        let appStates = getAppStates()
        let tabIndex = appStates.reqTab.activeIndex
        if (appStates.reqTabCon.reqCons[tabIndex].showReqMethodList) {
            ReqTabConAction.toggleMethodList(tabIndex)
        }
        if (appStates.reqTabCon.reqCons[tabIndex].showBodyRawTypeList) {
            ReqBodyAction.toggleRawTypeList(tabIndex)
        }
    }

})


export default Index
