import { createContext } from 'react'
import { decorate, observable, computed, action } from 'mobx'

export class Filterm {
  id = ''
  name = ''
  types = {
    Normal: false,
    Fire: false,
    Fighting: false,
    Water: false,
    Flying: false,
    Grass: false,
    Poison: false,
    Electric: false,
    Ground: false,
    Psychic: false,
    Rock: false,
    Ice: false,
    Bug: false,
    Dragon: false,
    Ghost: false,
    Dark: false,
    Steel: false,
    Fairy: false
  }

  get filterTypes () {
    var result = []
    for (var i in this.types) {
      if (this.types[i] === true) {
        result.push(i.toLowerCase())
      }
    }
    return result
  }

  toggleId = e => {
    this.id = e.target.value
  }

  toggleName = e => {
    this.name = e.target.value.toLowerCase()
  }

  toggleType = type => {
    this.types[0][type] = !this.types[0][type]
  }
}

decorate(Filterm, {

  id: observable,
  name: observable,
  types: observable,
  filterTypes: computed,

  toggleType: action
})

export default createContext(new Filterm())
