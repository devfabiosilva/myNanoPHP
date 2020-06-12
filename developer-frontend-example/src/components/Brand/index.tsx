import React from 'react';
import brand from '../../assets/brand.png';
import './style.css';

export function Brand() {

    return (
        <div className="band-logos">
            <img className="nano-logo" src={ brand } alt="nano logo" />
        </div>
    );

}
