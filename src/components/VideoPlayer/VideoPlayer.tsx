import { FC } from 'react'

import ReactPlayer from 'react-player/youtube'

import styles from './style.module.css'

type VideoPlayerProps = {
  url: string
}

export const VideoPlayer: FC<VideoPlayerProps> = ({ url }) => {
  return (
    <div className={styles.container}>
      <ReactPlayer
        className={styles.player}
        url={url}
        controls={true}
        width="100%"
        height="100%"
      />
    </div>
  )
}
