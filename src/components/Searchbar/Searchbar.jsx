import { Component } from "react";
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
    state = {
        name: '',
    };
    
    
    handleSearch = e => {
        this.setState({ name: e.currentTarget.value.toLowerCase() });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { name } = this.state;
        const { onSubmit } = this.props;

        if (name.trim() === '') {
            Notiflix.Notify.info('Enter the name of the image!');
            return;
        }

        onSubmit(name);
        this.setState({ name: '' });
    };


    render()
        
    {

const { name } = this.state.name;

         return (
        <header className="Searchbar">
  <form className="SearchForm" onSubmit={this.handleSubmit}>
    <button type="submit" className="SearchForm-button">
      <span className="SearchForm-button-label">Find</span>
    </button>

    <input
      className="SearchForm-input"
      type="text"
    autoComplete="off"
    autoFocus
    value={name}
    placeholder="Search images and photos"
    onChange={this.handleSearch}
    />
  </form>
</header>
    )
    }
   

}



Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired
};