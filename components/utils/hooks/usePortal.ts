import { useEffect, useState } from 'react'
import useSSR from './useSSR'

const namespace = 'raw-ui';

const createElement = (id: string): HTMLElement => {
  const element = document.createElement('div')
  element.setAttribute('id', id)
  return element
}

const usePortal = (
  name: string,
  getContainer?: () => HTMLElement | null,
): HTMLElement | null => {
  const id = `${namespace}-${name}`;
  const { isBrowser } = useSSR()
  const [portal, setPortal] = useState<HTMLElement | null>(
    isBrowser ? createElement(id) : null,
  )

  useEffect(() => {
    const container = getContainer?.() ?? document.body
    const hasElement = container.querySelector<HTMLElement>(`#${id}`)
    const element = hasElement || createElement(id)

    if (!hasElement) {
      container.appendChild(element)
    }
    
    setPortal(element)
  }, [])

  return portal
}

export default usePortal
