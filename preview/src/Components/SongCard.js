import React, {useState} from "react";
import SpotifyIcon from "./SpotifyIcon";

const SongCard = (props) => {
  const [result, setResult] = useState(null);

  const url = new URL(props.src.URL);
  let link;
  if (url.hostname.includes("www.")) {
    link = url.hostname.replace("www.", "");
  } else {
    link = url.hostname;
  }

  const _handlePressButtonAsync = async () => {
    
  };

  return (
    
      <div style={styles.container}>
        <div style={styles.title}>{props.src.description}</div>
        <div style={styles.desc}>
          {props.name}
        </div>
        <SpotifyIcon style={styles.icon}  stroke="#1DB954"/>
      </div>
  
  );
};

const styles = {
  container: {
    width: 190,
    maxWidth: 220,
    height: 74,
    borderRadius: 20,
    display:"flex",
    backgroundColor: "#2F333C",
    justifyContent: "center",
    position:"relative",
    
    paddingLeft: 15,
    paddingRight: 60,
    flexDirection: "column",
    marginTop: 15,
    marginBottom: 15,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
  desc: {
    color: "white",
    fontSize:10
  },
  icon: {
    position: "absolute",
    right: 27.6,
  },
}
export default SongCard;
