import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  constructor() {
    super()

    this.state = {
      pokemon: null,
      isLoading: false,
      results: null,
      value: ''
    }
  }

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: null, value: '' })

  // handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)
      const filtering = this.state.pokemon.filter(pokemon => pokemon.name.toLowerCase().includes(this.state.value.toLowerCase()))

      this.setState({
        isLoading: false,
        results: filtering,
      }, () => console.log(this.state.results, `logging results`))
    }, 300)
  }

  componentDidMount = () => {
    this.fetchAllPokemon()
  }

  fetchAllPokemon = () => {
    fetch(`http://localhost:3000/pokemon`).then(resp => resp.json()).then(pokemon => this.setState({pokemon}))
  }

  render() {
    console.log(`in render`, this.state.results == undefined);

    const { isLoading, value } = this.state

    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search loading={isLoading}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            value={value}
            showNoResults={true}
            open={false}
            {...this.props} />
        <br />
        <PokemonCollection pokemon={(this.state.results == undefined) ? this.state.pokemon : this.state.results}/>
        <br />
        <PokemonForm fetchAllPokemon={this.fetchAllPokemon}/>
      </div>
    )
  }
}

export default PokemonPage
