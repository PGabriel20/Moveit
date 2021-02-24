import { Profiler } from "inspector";

import styles from '../styles/components/Profile.module.css';

export function Profile(){
  return(
    <div className={styles.profileContainer}>
      <img src="https://i.pinimg.com/originals/db/ef/a3/dbefa3fd491990cb78e7612cd29d9c61.jpg" alt="Eu msm"/>
      <div>
        <strong>Paulo Gabriel</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level 1
        </p>
      </div>
    </div>
  )
}