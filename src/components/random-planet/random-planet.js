import React, {Component} from 'react';
import SwapiService from '../../services/swapi-service'
import './random-planet.css';

export default class RandomPlanet extends Component {

    constructor() {
        super();
        this.updatePlanet();
        setInterval(this.updatePlanet, 4000)
    }

    swapiService = new SwapiService();

    state = {
        id: 2,
        name: '',
        population: null,
        rotationPeriod: null,
        diameter: null
    };

    updatePlanet = () => {
        const id = Math.floor(Math.random() * 25 ) + 2;
        this.swapiService.getPlanet(id)
            .then(planet => {
                this.setState((state) =>
                    ({...state,
                        id,
                        name: planet.name,
                        population: planet.population,
                        rotationPeriod: planet.rotation_period,
                        diameter: planet.diameter
                    })
                )}
                )};

    render() {

        const {population, rotationPeriod, diameter, name, id} = this.state;

        return (
            <div className="random-planet jumbotron rounded">
                <img className="planet-image"
                     src= {`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
                <div>
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Population</span>
                            <span>{population}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Rotation Period</span>
                            <span>{rotationPeriod}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Diameter</span>
                            <span>{diameter}</span>
                        </li>
                    </ul>
                </div>
            </div>

        );
    }
}
