import { createContext } from 'react'
import { decorate, observable, computed, action } from 'mobx'

export class FiltTypes {
  constructor () {
    this.types = {
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

  toggleType (type) {
    this.types[type] = !this.types[type]
  }
}

decorate(FiltTypes, {

  types: observable,
  filterTypes: computed,

  toggleType: action
})

export default createContext(new FiltTypes())
// export const FilterContext = createContext(new Filter())
