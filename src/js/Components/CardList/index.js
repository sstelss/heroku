/* eslint-disable brace-style */
import React from 'react'
import './index.css'
import Card from '../Card'

import Filterm from '../mobxStore'

import FiltTypes from '../mobxTypes'

import { observer } from 'mobx-react-lite'

const Pokedex = require('pokeapi-js-wrapper')

const CardList = observer(function (props) {
  const store = React.useContext(FiltTypes)

  const storeName = React.useContext(Filterm)

  const { currentPage, amount, funcMaxIndex, RegStatus } = props
  const mstart = currentPage * amount - amount + 1
  const finish = mstart + amount
  const P = new Pokedex.Pokedex()

  const [ListElements, setListElements] = React.useState([])

  /// /////////////
  const [LoveList, setLoveList] = React.useState([])

  // Проверка авторизован ли пользователь и получение списка его любимых покемонов
  React.useEffect(() => {
    if (RegStatus) {
      fetch('/belove/getList')
        .then(response => response.json())
        .then(res => {
          setLoveList([...res.PokemonsList])
        })
    }
  }, [LoveList.length, RegStatus, mstart])

  /// ////////////
  // запрос всех покемонов учитывая параметры фильтра
  React.useMemo(() => {
    let mypromise = []
    const list = []

    // если было задано определенное имя или ID
    if (storeName.name !== '') {
      let temp = 0
      mypromise.push(
        P.getPokemonByName(storeName.name)
          .then(function (response) {
            const tempStats = []
            response.types.map(value => tempStats.push(value.type.name))
            temp = {
              name: response.name,
              id: response.id,
              icon: response.sprites.front_default,
              stats: response.stats,
              type: tempStats,
              weight: response.weight
            }
            list.push(temp)
          })
          .catch(function (error) {
            console.log('There was an ERROR: ', error)
          })
      )
      funcMaxIndex(1)
    }

    // если список фильтра по типам не пустой
    else if (store.filterTypes.length > 0) {
      let temp = 0
      let pokemonList = []

      for (let i = 0; i < store.filterTypes.length; i++) {
        mypromise.push(
          P.getTypeByName(store.filterTypes[i])
            .then(function (types) {
              const giveNameList = value => {
                const arr = []
                for (const i in value) {
                  arr.push(value[i].pokemon.name)
                }
                return arr
              }
              pokemonList.push(...giveNameList(types.pokemon))
            })

            .catch(function (error) {
              console.log('There was an ERROR: ', error)
            })
        ) // mypromise.push
      } // for(i)

      Promise.all(mypromise).then(result => {
        mypromise = []
        // del seem elements
        pokemonList = pokemonList.filter(function (elem, index, self) {
          return index === self.indexOf(elem)
        })

        for (let i = mstart; i < finish && i < pokemonList.length; i++) {
          mypromise.push(
            P.getPokemonByName(pokemonList[i])
              .then(response => {
                const tempStats = []
                response.types.map(value => tempStats.push(value.type.name))
                temp = {
                  name: response.name,
                  id: response.id,
                  icon: response.sprites.front_default,
                  stats: response.stats,
                  type: tempStats,
                  weight: response.weight
                }
                // list.push(temp);
                setListElements(state => [...state, temp])
              })

              .catch(function (error) {
                console.log('There was an ERROR: ', error)
              })
          )
        }
        funcMaxIndex(pokemonList.length)
      })
    }

    // просто выдача по порядку
    else if (mstart < 801) {
      for (let i = mstart; i < finish; i += 1) {
        let temp = 0
        mypromise.push(
          P.getPokemonByName(i)
            .then(function (response) {
              const tempStats = []
              response.types.map(value => tempStats.push(value.type.name))
              temp = {
                name: response.name,
                id: response.id,
                icon: response.sprites.front_default,
                stats: response.stats,
                type: tempStats,
                weight: response.weight
              }
              list.push(temp)
            })
            .catch(function (error) {
              console.log('There was an ERROR: ', error)
            })
        )
      }
      funcMaxIndex(800)
    } // if(mstart < 801)
    // it'll work out when all promises from arr mypromise done

    Promise.all(mypromise).then(result => {
      setListElements(state => [...list])
    })
  }, [currentPage, amount, storeName.name, store.filterTypes])

  const listCards = ListElements.map(value => (
    <Card
      value={value}
      RegStatus={RegStatus}
      LoveList={LoveList.slice()}
      key={value.id}
    />
  ))

  return <div className="deksArea">{listCards}</div>
})

export default CardList
