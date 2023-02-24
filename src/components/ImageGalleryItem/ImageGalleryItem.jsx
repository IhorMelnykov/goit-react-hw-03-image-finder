import { Component } from "react";
import PropTypes from 'prop-types';
import { Modal } from "components/Modal/Modal";

export class ImageGalleryItem extends Component {
    state = {
        showModal: false,
    };


  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }))
  };
   
  
    
    render() {
        const { webformatURL, tags, largeImageURL } = this.props;

        return (
          
        <li className="ImageGalleryItem">
            <img 
            src={webformatURL}
            alt={tags} 
            className="ImageGalleryItem-image" 
            onClick={this.toggleModal}
            />

            {this.state.showModal && 
            <Modal 
            largeImageURL={largeImageURL} 
            tags={tags} 
            toggleModal={this.toggleModal}/>
            }
        </li>
        )
    } 
}

ImageGalleryItem.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired
};