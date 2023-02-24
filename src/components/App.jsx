import React, { Component } from "react";
import { fetchImg } from "API/api";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import Notiflix from 'notiflix';
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";




export class App extends Component {
  state = {
    name: '',
    images: [],
    page: 1,
    totalHits: 0,
    loading: false,
  };

   async componentDidUpdate(prevProps, prevState) {
    const { name, page } = this.state;

    if (prevState.name !== name || prevState.page !== page) {
      try {
        this.setState({ loading: true });

        const { totalHits, hits } = await fetchImg(name, page);
        
        if (totalHits === 0) {
          Notiflix.Notify.info('No image with that name:(');
          this.setState({ loading: false });
          return;
        }

        this.setState(prevState => ({
          images: page === 1 ? hits : [...prevState.images, ...hits],

          totalHits: page === 1 ? totalHits - hits.length : totalHits - [...prevState.images, ...hits].length,
        }));

        this.setState({ loading: false });
      } catch (error) {
        Notiflix.Notify.warning(`Something went wrong! ${error}`);
      }
    }
}

  handleFormSubmit = name => {
    this.setState({ name, page: 1 });
  }

   loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  };
  
  render() {
    const { loading, name, images, totalHits } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {loading && <Loader />}
        {name &&
          <ImageGallery images={images} /> }
        {totalHits > 0 && <Button loadMore={this.loadMore}/>}
    </>
  );


  }



  
};



