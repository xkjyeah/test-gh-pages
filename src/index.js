import axios from 'axios'
import * as showdown from 'showdown'

export function mount (elementSelector, url) {
  const elem = (elementSelector instanceof HTMLElement)
    ? elementSelector
    : document.querySelector(elementSelector)

  if (!elem) {
    throw new Error(`The element '${elementSelector}' could not be found!`)
  }

  // Convert Github URLs to Rawgit URLs
  const finalUrl = convertGithubToRawgit(url)

  // fetch and mount
  axios.get(finalUrl, {responseType: 'text'})
    .then((r) => {
      const converter = new showdown.Converter()
      converter.setFlavor('github')

      elem.innerHTML = converter.makeHtml(r.data)
    })
}

export function auto () {
  const elems = document.querySelectorAll('[data-faq-o-matic]')

  for (let i = 0; i < elems.length; i++) {
    mount(elems[i], elems[i].dataset['faqOMatic'])
  }
}

function convertGithubToRawgit (url) {
  const matches = url.match(/^https:\/\/github.com\/([^/]+)\/([^/]+)\/blob\/(.*)$/)
  if (matches) {
    console.warn('You are using a raw Github URL with faq-o-matic. ' +
      'Please use a cdn.rawgit.com URL for best performance! ' +
      'For more information visit https://rawgit.com/')
    return `https://rawgit.com/${matches[1]}/${matches[2]}/${matches[3]}`
  } else {
    return url
  }
}
