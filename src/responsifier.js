
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
  const blockTags = ['BODY', 'HEADER', 'FOOTER', 'DIV', 'UL', 'OL', 'TABLE']
  const textTags = ['P', 'LI', 'SPAN', 'EM', 'STRONG', 'INPUT', 'BUTTON', 'TH', 'TD']
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

  if (tagName === 'TH' || tagName === 'TD') {
    DOMElement.style.width = '100%'
    DOMElement.style.height = 'auto'
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

document.addEventListener('DOMContentLoaded', responsify)
