import gsap from 'gsap'

export const useLikeAnimation = () => {
  const likeAnimation = (id: number) => {
    const elementId = `#post-${id}`
    const tl = gsap.timeline()
    tl.to(elementId, { scale: 1.5, duration: 0.15 })
    tl.to(elementId, { scale: 0.9, duration: 0.15 })
    tl.to(elementId, { scale: 1.2, duration: 0.35 })
    tl.to(elementId, { scale: 0, duration: 0.35 })
  }

  return {
    likeAnimation,
  }
}
