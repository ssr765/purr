import type { Entity } from '@/models/Entity'
import { useI18n } from 'vue-i18n'

export const useMapUtils = () => {
  const { t } = useI18n()
  const popupBuilder = (data: Entity) => {
    const wrapper = document.createElement('div')
    const content = document.createElement('div')
    const info = document.createElement('div')
    const title = document.createElement('h3')
    const logo = document.createElement('img')
    const webpage = document.createElement('a')
    const noWebpage = document.createElement('i')
    const contact = document.createElement('p')
    const address = document.createElement('p')

    content.classList.add(
      'p-2',
      'flex',
      'flex-col',
      'items-center',
      'gap-2',
      'text-center',
    )
    title.classList.add(
      'text-3xl',
      '!mb-1',
      'font-["Fredoka"]',
      'font-semibold',
      'leading-7',
    )
    logo.classList.add(
      'size-16',
      'rounded-full',
      'mx-auto',
      'bg-white',
      'outline-ctp-lavender',
      'outline-2',
      'outline',
      'object-contain',
    )
    address.classList.add('leading-4', 'font-normal')
    contact.classList.add('leading-4')

    title.innerHTML = data.name
    logo.src = data.logo
    logo.alt = data.name
    logo.width = 100
    address.innerHTML = data.address
    contact.innerHTML = `${data.phone} · `
    if (data.webpage) {
      webpage.href = 'https://' + data.webpage
      webpage.target = '_blank'
      webpage.innerHTML = t('app.maps.webpage')
      contact.appendChild(webpage)
    } else {
      noWebpage.innerHTML = t('app.maps.noWebpage')
      contact.appendChild(noWebpage)
    }

    if (data.logo) content.appendChild(logo)
    info.appendChild(title)
    info.appendChild(address)
    info.appendChild(contact)
    content.appendChild(info)
    wrapper.appendChild(content)

    return wrapper.innerHTML
  }

  return {
    popupBuilder,
  }
}
