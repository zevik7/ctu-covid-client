import React, { useRef, useState, useEffect } from 'react'

import './index.css'

import { useDispatch, useSelector } from 'react-redux'

import ThemeAction from '../../redux/actions/themeAction'

const mode_settings = [
  {
    id: 'light',
    name: 'Light',
    background: 'light-background',
    class: 'theme-mode-light',
  },
  {
    id: 'dark',
    name: 'Dark',
    background: 'dark-background',
    class: 'theme-mode-dark',
  },
]

const color_settings = [
  {
    id: 'blue',
    name: 'Blue',
    background: 'blue-color',
    class: 'theme-color-blue',
  },
  {
    id: 'red',
    name: 'Red',
    background: 'red-color',
    class: 'theme-color-red',
  },
  {
    id: 'cyan',
    name: 'Cyan',
    background: 'cyan-color',
    class: 'theme-color-cyan',
  },
  {
    id: 'green',
    name: 'Green',
    background: 'green-color',
    class: 'theme-color-green',
  },
  {
    id: 'orange',
    name: 'Orange',
    background: 'orange-color',
    class: 'theme-color-orange',
  },
]

const clickOutSideRef = (content, toggle) => {
  document.addEventListener('mousedown', (e) => {
    // Click toggle
    if (toggle.current && toggle.current.contains(e.target)) {
      content.current.classList.toggle('active')
    } else {
      // Click outside
      if (content.current && !content.current.contains(e.target))
        content.current.classList.remove('active')
    }
  })
}

const ThemeMenu = () => {
  const menu_ref = useRef(null)
  const menu_toggle_ref = useRef(null)

  clickOutSideRef(menu_ref, menu_toggle_ref)

  const setActiveMenu = () => {
    menu_ref.current.classList.add('active')
  }

  const closeMenu = () => menu_ref.current.classList.remove('active')

  const [currentMode, setCurrentMode] = useState('light')

  const [currentColor, setCurrentColor] = useState('blue')

  const dispatch = useDispatch()

  const setMode = (mode) => {
    setCurrentMode(mode.id)
    localStorage.setItem('themeMode', mode.class)
    dispatch(ThemeAction.setMode(mode.class))
  }

  const setColor = (color) => {
    setCurrentColor(color.id)
    localStorage.setItem('colorMode', color.class)
    dispatch(ThemeAction.setColor(color.class))
  }

  const theme = useSelector((state) => state.themeReducer)

  useEffect(() => {
    const themeClass = mode_settings.find((el) => el.class === theme.mode)

    const colorClass = color_settings.find((el) => el.class === theme.color)

    if (themeClass) setCurrentMode(themeClass.id)

    if (colorClass) setCurrentColor(colorClass.id)
  }, [])

  return (
    <div>
      <button
        ref={menu_toggle_ref}
        className="dropdown__toggle"
        onClick={() => setActiveMenu()}
      >
        <i className="bx bx-palette"></i>
      </button>
      <div className="theme-menu" ref={menu_ref}>
        <h4>Theme settings</h4>
        <button className="theme-menu__close" onClick={() => closeMenu()}>
          <i className="bx bx-x"></i>
        </button>
        <div className="theme-menu__select">
          <span>Choose mode</span>
          <ul className="mode-list">
            {mode_settings.map((item, index) => (
              <li key={index} onClick={() => setMode(item)}>
                <div
                  className={`mode-list__color ${item.background} ${
                    item.id === currentMode && 'active'
                  }`}
                >
                  <i className="bx bx-check"></i>
                </div>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="theme-menu__select">
          <span>Choose color</span>
          <ul className="mode-list">
            {color_settings.map((item, index) => (
              <li key={index} onClick={() => setColor(item)}>
                <div
                  className={`mode-list__color ${item.background} ${
                    item.id === currentColor && 'active'
                  }`}
                >
                  <i className="bx bx-check"></i>
                </div>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ThemeMenu
