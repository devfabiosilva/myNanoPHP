import React from 'react';
import brand from '../../assets/brand.png';
import './style.css';

export default function Brand() {

    return (
        <div className="band-logos">
            <img className="nano-logo" src={ brand } alt="nano logo" />
            <div className="nano-link" title="nano.org" onClick={ () => window.open('https://nano.org/')}/>
            <div className="p2pow-link" title="Peer to Pow" onClick= { () => window.open('https://medium.com/@kaiquenunes/delegated-proof-of-work-d566870924d9') }/>
            <div className="php-link" title="PHP" onClick={ () => window.open('https://www.php.net/') } />
            <div className="iot-link" title="Internet of Things" onClick={ () => window.open('https://en.wikipedia.org/wiki/Internet_of_things') }/>
        </div>
    );

}
