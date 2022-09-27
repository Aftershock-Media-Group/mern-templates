import Video from '../assets/animation/video.json'

export const LottieAnimations = {
  Video,
}

export const LottieConfig = (animationData) => {
  return {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
}
