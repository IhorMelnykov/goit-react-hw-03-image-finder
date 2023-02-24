import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';


const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown);
    }


    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = e => {
        if (e.code === "Escape") {
            this.props.toggleModal();
        }
    }

    handleOverlayClick = e => {
        if (e.currentTarget === e.target) {
            this.props.toggleModal();
}
    }
    
    render() {

        const { largeImageURL, tags } = this.props;

        return createPortal(
            <div className="Overlay" onClick={this.handleOverlayClick}>
            <div className="Modal">
                <img src={largeImageURL} alt={tags} />
            </div>
            </div>,
            modalRoot,
        );
    }

}


Modal.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired
};