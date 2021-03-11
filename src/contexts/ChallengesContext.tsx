import { create } from 'domain';
import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge{
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChellengesContextData{
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  levelUp: ()=> void;
  startNewChallenge: () => void;
  activeChallenge: Challenge;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
  experienceToNextLevel: number;
}

interface ChallengesProviderProps{
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChellengesContextData);

export function ChallengesProvider({ 
  children,
  ...rest
 } : ChallengesProviderProps){

  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setcurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setchallengesCompleted] = useState(rest.challengesCompleted ?? 0);

  const [activeChallenge, setactiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  

  const experienceToNextLevel = Math.pow((level+1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(()=>{
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  },[level, currentExperience, challengesCompleted]);

  function levelUp(){
      setLevel(level+1);
      setIsLevelUpModalOpen(true);
    }
    
    function closeLevelUpModal(){
      setIsLevelUpModalOpen(false);
  }

  function startNewChallenge(){
    const randomChellengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChellengeIndex];

    setactiveChallenge(challenge);

    new Audio('/notificattion.mp3').play();

    if (Notification.permission ===  'granted'){
      new Notification('Novo desafio', {
        body: `Valendo ${challenge.amount}xp!`
      });
    }
  }

  function resetChallenge(){
    setactiveChallenge(null);
  }

  function completeChallenge(){
    if(!activeChallenge){
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextLevel){
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();

      setcurrentExperience(finalExperience);
      setactiveChallenge(null);
      setchallengesCompleted(challengesCompleted + 1);
    }
  }

  return(
    <ChallengesContext.Provider value={{level,
      currentExperience,
      challengesCompleted,
      levelUp, 
      startNewChallenge,
      activeChallenge,
      resetChallenge,
      experienceToNextLevel,
      completeChallenge,
      closeLevelUpModal
    }}
    >

      {children}

      {isLevelUpModalOpen && <LevelUpModal />}

    </ChallengesContext.Provider>
  )
}

