import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store'
import { addRssSource } from './store/rss-source/actions';
import { RssReadStatus } from './store/rss-source/types';

[
  {
    id: 'actu-une',
    label: 'Actualité - La Une',
    url: 'https://www.lemonde.fr/rss/une.xml'
  },
  {
    id: 'france-politique',
    label: 'France -Politique',
    url: 'https://www.lemonde.fr/politique/rss_full.xml'
  },
  {
    id: 'sciences-une',
    label: 'Sciences - La Une',
    url: 'https://www.lemonde.fr/sciences/rss_full.xml'
  },
  {
    id: 'une-libe',
    label: 'La Une Libé',
    url: 'http://rss.liberation.fr/rss/latest/'
  },
  {
    id: 'une-fig',
    label: 'Figaro - La Une',
    url: 'https://www.lefigaro.fr/rss/figaro_actualites.xml'
  },
  {
    id: 'libe-1',
    label: 'Libération 1',
    url: 'http://rss.liberation.fr/rss/latest/'
  },
  {
    id: 'ofr-une',
    label: 'Ouest France A la Une',
    url: 'https://www.ouest-france.fr/rss-en-continu.xml'
  },
  {
    id: 'reddit-funny',
    label: 'Reddit - Funny',
    url: 'https://www.reddit.com/r/funny.rss'
  },
  {
    id: 'fr-info-1',
    label: 'France Info',
    url: 'https://www.francetvinfo.fr/images/videos.rss'
  }
  
].map(source => store.dispatch(addRssSource({
  ...source,
  //url: `https://yacdn.org/proxy/${source.url}`, // alternative : https://cors-anywhere.herokuapp.com/
  url: `https://cors-anywhere.herokuapp.com/${source.url}`, // alternative : https://cors-anywhere.herokuapp.com/
  documentInfo: null,
  loadErrorMessage: null,
  readStatus: RssReadStatus.IDLE
})));


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


