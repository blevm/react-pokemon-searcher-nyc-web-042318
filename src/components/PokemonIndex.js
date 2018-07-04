import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  constructor() {
    super()

    this.state = {
      pokemon: null
    }
  }

  componentDidMount = () => {
    fetch(`http://localhost:3000/pokemon`).then(resp => resp.json()).then(pokemon => this.setState({pokemon}))
  }

  render() {
    console.log(`in render`, this.state.pokemon);
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce(() => console.log('🤔'), 500)} showNoResults={false} />
        <br />
        <PokemonCollection pokemon={this.state.pokemon}/>
        <br />
        <PokemonForm />
      </div>
    )
  }
}

export default PokemonPage
