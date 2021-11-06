import logo from './logo.svg';
import './App.css';
import PreviewScreen from './Pages/PreviewScreen';

function App() {
  return (
    <div style={{width:"100vw", height:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
     <PreviewScreen exhibit={exhibit}/>
    </div>
  );
}


const exhibit =  {
  "contents":  [
     {
      "URL": "https://www.youtube.com/watch?v=NCtzkaL2t_Y&ab_channel=TheBeatlesVEVO",
      "contentTypeID": 2,
      "description": "The Beatles - don't let me down",
      "position": 1,
    },
     {
      "URL": "https://www.mdzol.com/u/fotografias/m/2021/10/12/f608x342-1121037_1150760_0.jpg",
      "contentTypeID": 1,
      "description": "The Beatles were an English rock band formed in Liverpool in 1960.",
      "position": 2,
    },
     {
      "URL": "https://media2.giphy.com/media/3ohzdOYkP3vDIEXEgo/giphy.gif?cid=ecf05e47sbtsrd7yr646cffr50ciry8g1bmqgfol7nlqcxle&rid=giphy.gif&ct=g",
      "contentTypeID": 1,
      "description": "The group are regarded as the most influential band of all time.",
      "position": 3,
    },
     {
      "URL": "https://www.thebeatles.com/",
      "contentTypeID": 4,
      "description": "The Beatles present their 1970 chart-topping album Let It Be in sweeping new Special Editions",
      "position": 3,
    },
     {
      "URL": "https://open.spotify.com/track/6dGnYIeXmHdcikdzNNDMm2?si=de5fa02e436e4d0e",
      "contentTypeID": 3,
      "description": "Here Comes The Sun",
      "position": 3,
    },
  ],
  "description": "The Beatles were an English rock band formed in Liverpool in 1960. The group, whose best-known line-up comprised John Lennon, Paul McCartney, George Harrison and Ringo Starr, are regarded as the most influential band of all time.[1] They were integral to the development of 1960s counterculture and popular music's recognition as an art form.[2] Rooted in skiffle, beat and 1950s rock and roll, their sound incorporated elements of classical music and traditional pop in innovative ways; the band later explored music styles ranging from ballads and Indian music to psychedelia and hard rock. As pioneers in recording, songwriting and artistic presentation, the Beatles revolutionised many aspects of the music industry and were often publicised as leaders of the era's youth and sociocultural movements.[3] Led by primary songwriters Lennon and McCartney, the Beatles evolved from Lennon's previous group, the Quarrymen, and built their reputation playing clubs in Liverpool and Hamburg over three years from 1960, initially with Stuart Sutcliffe playing bass. The core trio of Lennon, McCartney and Harrison, together since 1958, went through a succession of drummers, most notably Pete Best, before asking Starr to join them in 1962. Manager Brian Epstein moulded them into a professional act, and producer George Martin guided and developed their recordings, greatly expanding their domestic success after their first hit, Love Me Do, in late 1962. As their popularity grew into the intense fan frenzy dubbed Beatlemania, the band acquired the nickname the Fab Four, with Epstein, Martin and other members of the band's entourage sometimes given the informal title of fifth Beatle.",
  "mainImage": "https://www.mdzol.com/u/fotografias/m/2021/10/12/f608x342-1121037_1150760_0.jpg",
  "name": "The Beatles",
  "scanID": 78,
}
export default App;


