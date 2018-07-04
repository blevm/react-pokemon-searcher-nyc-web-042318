import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  constructor() {
    super()

    this.state = {
      sideDisplayed: 'front'
    }
  }

  render() {
    let { id, sprites, name, stats } = this.props.pokemon
    return (
      <Card key={id}>
        <div>
          <div className="image">
            <img alt="oh no!" src={(this.state.sideDisplayed === 'front') ? sprites.front : sprites.back }/>
          </div>
          <div className="content">
            <div className="header">{name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              // {stats.find(stat => stat.name === 'hp').value} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
