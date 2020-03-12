
const responsify = () => {
  if (document.getElementById('viewport')) {
    document.getElementById('viewport').setAttribute('content', 'width=device-width, initial-scale=1.0')
  } else {
    const viewport = document.createElement('meta')
    viewport.setAttribute('name', 'viewport')
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0')
    document.getElementsByTagName('head')[0].appendChild(viewport)
  }

  applyStyles(document.body)
}

const applyStyles = DOMElement => {
  const tagName = DOMElement.tagName
  const blockTags = ['BODY', 'HEADER', 'FOOTER', 'DIV', 'UL', 'OL']
  const textTags = ['P', 'LI', 'SPAN', 'EM', 'STRONG', 'INPUT', 'BUTTON']
  const titleTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']

  if (blockTags.find(item => item === tagName)) {
    DOMElement.style.width = '100%'
    DOMElement.style.height = 'auto'
    DOMElement.style.float = 'left'
    DOMElement.style.padding = '1rem'
    DOMElement.style.margin = '1rem 0'
    DOMElement.style.boxSizing = 'border-box'
    DOMElement.style.border = 'none'
    DOMElement.style.boxShadow = 'none'
  }

  if (textTags.find(item => item === tagName)) {
    DOMElement.style.padding = 0
    DOMElement.style.margin = '1rem 0'
    DOMElement.style.fontSize = '1rem'
  }

  if (titleTags.find(item => item === tagName)) {
    DOMElement.style.padding = 0
    DOMElement.style.border = 'none'
    DOMElement.style.boxShadow = 'none'
  }

  if (tagName === 'H1') {
    DOMElement.style.margin = '1rem 0'
    DOMElement.style.fontSize = '2rem'
  }

  if (tagName === 'H2') {
    DOMElement.style.margin = '1rem 0'
    DOMElement.style.fontSize = '1.6rem'
  }

  if (tagName === 'H3') {
    DOMElement.style.margin = '1rem 0'
    DOMElement.style.fontSize = '1.4rem'
  }

  if (tagName === 'TABLE') {
    DOMElement.parentNode.insertBefore(createResponsiveTable(DOMElement), DOMElement)
    DOMElement.remove()
  }

  if (DOMElement.hasChildNodes()) {
    let child = DOMElement.firstChild
    while (child) {
      if (child.nodeType === 1 && child.nodeName !== 'SCRIPT') {
        applyStyles(child)
      }
      child = child.nextSibling
    }
  } else {
    applyStyles(DOMElement)
    return false
  }
}

const createResponsiveTable = DOMElement => {
  const firstRow = DOMElement.querySelector('TR')
  const responsiveTable = document.createElement('DIV')
  const arrayHeader = []

  responsiveTable.style.width = '100%'

  responsiveTable.style.float = 'left'
  responsiveTable.style.margin = '1rem 0'

  if (firstRow === null) {
    return false
  }

  let headerColumns = firstRow.querySelectorAll('TH')

  if (headerColumns === null) {
    headerColumns = firstRow.querySelectorAll('TD')
  }

  headerColumns.forEach(item => {
    const headerColumn = document.createElement('DIV')
    headerColumn.textContent = item.textContent
    headerColumn.style.width = '50%'
    headerColumn.style.float = 'left'
    headerColumn.style.fontWeight = 'bold'
    arrayHeader.push(headerColumn)
  })

  const allRows = DOMElement.querySelectorAll('TR')

  allRows.forEach(row => {
    const columns = row.querySelectorAll('TD')
    for (let j = 0; j < columns.length; j++) {
      const column = document.createElement('DIV')
      column.textContent = columns[j].textContent
      column.style.width = '50%'
      column.style.float = 'left'
      column.style.paddingLeft = '1rem'
      column.style.boxSizing = 'border-box'

      const row = document.createElement('DIV')
      row.style.width = '100%'
      row.style.float = 'left'
      row.style.marginBottom = '1rem'
      row.style.paddingBottom = '1rem'
      row.style.borderBottom = '1px solid #c0c0c0'

      const clonedHeader = arrayHeader[j].cloneNode(true)
      row.appendChild(clonedHeader)
      row.appendChild(column)

      // console.log(row)

      responsiveTable.appendChild(row)
    }
  })

  // console.log(responsiveTable)

  return responsiveTable
}

document.addEventListener('DOMContentLoaded', responsify)
