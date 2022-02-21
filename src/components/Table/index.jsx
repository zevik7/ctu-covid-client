import React, { useState } from 'react'

import './index.css'

const Table = (props) => {
  const initDataShow = props.limit
    ? props.bodyData.slice(0, Number(props.limit))
    : props.bodyData

  const [dataShow, setDataShow] = useState(initDataShow)

  let pages = 1

  let range = []

  if (props.limit !== undefined) {
    let pageFloor = Math.floor(props.bodyData.length / Number(props.limit)) // Tong so trang phan nguyen
    pages =
      props.bodyData.length % Number(props.limit) === 0
        ? pageFloor
        : pageFloor + 1 // Tong so trang phan du
    range = [...Array(pages).keys()]
  }

  const [currentPage, setcurrentPage] = useState(0)

  const selectPage = (page) => {
    const start = Number(props.limit) * page
    const end = Number(props.limit) + start

    setDataShow(props.bodyData.slice(start, end))

    setcurrentPage(page)
  }

  return (
    <div>
      <div className="tabble-wrapper">
        <table>
          {props.headData && props.renderHead && (
            <thead>
              <tr>
                {props.headData.map((el, index) => props.renderHead(el, index))}
              </tr>
            </thead>
          )}
          {props.bodyData && props.renderBody && (
            <tbody>
              {dataShow.map((el, index) => props.renderBody(el, index))}
            </tbody>
          )}
        </table>
      </div>
      {pages > 1 && (
        <div className="table__pagination">
          {range.map((item, index) => (
            <div
              key={index}
              className={`table__pagination-item ${
                index === currentPage && 'active'
              }`}
              onClick={() => selectPage(index)}
            >
              {item + 1}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Table
