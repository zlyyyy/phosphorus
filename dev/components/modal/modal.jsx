//author @huntbao
'use strict'
import './modal.styl'
import React from 'react'
import classNames from 'classnames'
import AppConstants from '../../constants/constants'
import ModalAction from '../../actions/modalaction'
import EditCollHost from './edit.coll.host.jsx'
import EditFolderHost from './edit.folder.host.jsx'

class Modal extends React.Component {

    render() {
        let classes = classNames({
            'mod-modal': true,
            'modal-open': this.props.modal.open
        })
        return (
            <div className={classes} onClick={(e)=>{this.onClick(e)}}>
                <div className="modal-wrap" onClick={(e)=>{this.onClickBody(e)}}>
                    <div className="modal-hd">
                        <div className="modal-title">{this.props.modal.title}</div>
                        <div className="modal-close" onClick={(e)=>{this.onClickClose(e)}}>
                            <em className="glyphicon glyphicon-remove"></em>
                        </div>
                    </div>
                    {this.getBody()}
                </div>
            </div>
        )
    }

    getBody() {
        switch (this.props.modal.type) {
            case AppConstants.MODAL_EDIT_COLL_HOST:
                return (
                    <EditCollHost modal={this.props.modal} onChange={()=>{this.onChange()}} />
                )

            case AppConstants.MODAL_EDIT_FOLDER_HOST:
                return (
                    <EditFolderHost modal={this.props.modal} />
                )

            default:
                break
        }
    }

    onClick(evt) {
        this.close()
    }

    onClickBody(evt) {
        evt.stopPropagation()
    }

    onClickClose(evt) {
        this.close()
    }

    close() {
        ModalAction.closeModal()
    }
}

export default Modal
