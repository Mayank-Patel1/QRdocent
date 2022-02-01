import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  BackHandler,
} from "react-native";
import ScanningIcon from "../Home/Icons/ScanningIcon";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withRepeat,
} from "react-native-reanimated";
import axios from "axios";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { getSpotify } from "../../Authorize/authorize";

function GenerateScreen({ navigation, route }) {
  const move = useSharedValue(0);
  let tracks = [];
  const [message, setMessage] = useState("");
  const [errorPresent, setError] = useState(false);

  // styling for animated View
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: move.value,
        },
      ],
    };
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.replace("Home");
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    // make sure user has exhibits
    if (route.params.exhibits.length !== 0) {
      move.value = withRepeat(withTiming(65, { duration: 1500 }), -10, true);
      //get Spotify token
      getSpotify("@spotify_token")
        .then((tokenValue) => {
          if (tokenValue.access_token == null) {
            console.log("token null");
            return navigation.replace("Home");
          }
          console.log(tokenValue.access_token);
          // get the current user spotify account
          axios({
            method: "GET",
            url: "https://api.spotify.com/v1/me",
            headers: {
              authorization: `Bearer ${tokenValue.access_token}`,
            },
          })
            .then((res) => {
              // search for all exhibit artist
              for (let i = 0; i < route.params.exhibits.length; i++) {
                searchArtist(
                  route.params.exhibits[i].name,
                  tokenValue.access_token
                );
              }

              changePlaylist(res.data.id, tokenValue.access_token);
              return;
            })
            .catch((err) => {
              console.log(err.reason);
              setError(true);
              return navigation.replace("Home", {
                alert: true,
                message:
                  "Error connecting Spotify account. \n Try again later!",
              });
            });
        })
        .catch((err) => {
          console.log("2");
          connectionTimeout();
        });
    } else {
      navigation.replace("Home");
    }
  }, []);

  function connectionTimeout() {
    setTimeout(() => {
      navigation.replace("Home", {
        alert: true,
        message: "CONNECTION TIMEOUT",
      });
    }, 7000);
  }

  function searchArtist(artist, accessToken) {
    const updateName = artist.replace(/ /g, "%20");

    axios({
      method: "GET",
      url: `https://api.spotify.com/v1/search?q=${updateName}&type=artist&market=US&limit=1&offset=0`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // get artist ID and get their top tracks
        let artistID = res.data.artists.items[0].id;
        topTracks(artistID, accessToken);
      })
      .catch((err) => {
        console.log(err);
        connectionTimeout();
      });
  }

  function topTracks(artistID, accessToken) {
    axios({
      method: "GET",
      url: `https://api.spotify.com/v1/artists/${artistID}/top-tracks?market=US`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // add top 3 track IDs to
        for (let i = 0; i < 3; i++) {
          tracks.push(res.data.tracks[i].uri);
        }

        //createPlaylist(res.data.id, tokenValue.access_token)
      })
      .catch((err) => {
        console.log(err);
        connectionTimeout();
      });
  }
  function changePlaylist(userID, accessToken) {
    // Check user playlist
    axios({
      method: "GET",
      url: "https://api.spotify.com/v1/me/playlists",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // find if the QR docent playlist exist
        for (let i = 0; i < res.data.items.length; i++) {
          if (res.data.items[i].name === "QR DOCENT") {
            getSongs(res.data.items[i].id, accessToken);

            return;
          }
        }
        // the playlist doesn't exist so create one
        createPlaylist(userID, accessToken);
      })
      .catch((err) => {
        console.log(err);
        connectionTimeout();
      });
  }

  function createPlaylist(userID, accessToken) {
    const data = JSON.stringify({
      name: "QR DOCENT",
      description:
        "A playlist of the exhibits you scanned with the QR DOCENT app.",
      public: "true",
    });
    axios({
      method: "POST",
      url: `https://api.spotify.com/v1/users/${userID}/playlists`,
      data: data,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        const playlist = { id: res.data.id };
        // set the cover art to the qr logo
        setCover(playlist.id, accessToken);
        getSongs(playlist.id, accessToken);
        navigation.replace("Home");

        //console.log(res)
      })
      .catch((err) => {
        console.log(err);
        connectionTimeout();
      });
  }

  function setCover(playlistID, accessToken) {
    const data =
      "/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/bAEMBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIASwBLAMBEQACEQEDEQH/xAAfAAEAAgICAwEBAAAAAAAAAAAACgsICQEHAgQFAwb/xABOEAAABgIBAgMDBgkFDQkAAAAAAQIDBAUGBwgREgkKIRMiMRQaOUF4txUWMjhYdpe11hcYNkLXIygzQ1FSU1ZhYnGUmBkkJSdESJWywf/EABoBAQACAwEAAAAAAAAAAAAAAAADBAECBQb/xAA7EQEAAQIDBAcECgICAwEAAAAAAQIRAyExQVFhcQQSE4GRscEFodHwFBUiMjM0UnKy4VSCovFiksJC/9oADAMBAAIRAxEAPwCKuPUOeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADtPSWl9lcidr4HpHT2MzMw2VsnII2N4rj8ImScmTZBG+t92TK74lfX1kOLNtbqwmk1XVVJAsLWwdiV8awlOa1VU001VV26tN5nwidvP51IjrTbunwv5JvHGnyofGiiwepl8q92bU2JsmXEjO3NbqKyo8C1xSSlskqRU1UjIMTyPK8oZivKJqNkDkrEo1iTapR4tAS8iIzya/aOJMz2Vow84iJz4Tpa32omd9tyzTg0xEXib8Mo13QyeT5XHwxFJI1OcjSV0IlEe16cz6kXQ/U8D9fUviREk/igiQaSKL6b0j9UeH9tuxo4+Ln5rh4Yf8ApeRn7Vqb+Aw+m9I/VHh/Z2NHHxepN8rZ4Zchh6OxP5KwFrb7W5kTamNuyYylKMjdjtWWuJtd7VJGR970Z8+1JoJrr0Ue0e0OkRFutT4ceZ2NHHxR2PFy8v7nXALB53IjRGcXW7OOdXMixcyj5HWxYey9UIsZkeFVXeQSKUo1FlmHv2TsWtl5LW1lFNpptrXxJlIiuOZdou9E6bGJVNOJP29J45aRGt7Wy4TzRYmFFMTMacZ4I4/Qi9C6mn4p6kkvcP1T0Sn0QXaZdqPiguiFESiMhemYnTTYhezEiSbGXEr4MZ+bOmSWokOJDYdkTZkiW8yzHgsssNuvPrcf9mcduMw7MKU6yppZH7JlzW1Mdeuv7tMenvvn4b2bzMRG7Zxn1zTOeBnlXqXKtd47sbnps3PcXyvJq2Hcs6O1E/j9PZYdGnspfYrNhZzdV2Ys2F8pt1pNxQ45TMxKGxhvssZhcJUaY3Mxun/ansYyvaJmZtlFtNueuccNtpqcG9MTMRec9Z38GyZHlcfDFNJGp7kYpXwM/wCVan6dSPp0IlYIpSSLp0JBqV2ERIJSiSRnX+ndIn/9RHOL5bNu5vGDRtvfhMvL5rh4Yf8ApeRn7Vqb+Aw+m9I/VHh/bPY0cfF4H5XLwxS7iJzkanr1SSi2tTK6GaS6OElWBGXtEmfRPahxv3SNaTPuIn03pH6o8DsaOPi1O+I15X1WpNZ5RuHgrsTPtlqwqql5DkOjtopo7nN7mmgR3JNlL11lmKUeOQ7e2r2o7kmHhNpjca3vo6pkSlyWbdt12PW9no/T6utFFWc1TnMWz02bOHmixMKKYmY04zwQ+z/4GRERERGfcfRJERH1JSiMjIiMjSpSDIyNClI7TPqRnETvQuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASiPKi4Hj+Q87tx5rbwWZltrzjbeu4q6+37U6q1ynPMGpp1rDPr/crBNCi3qE+h90C7n+nvDn+0arYdEc75bLzPw8uU+BrVyjzSzfF0565f4cvEOTyGwLAsb2LlErY+FYBVU2WWVnX47FTkrV3PlXEtdOtM6YiPX48+xDgxZdeTUqcxPW7LOL+D5vO6Ph04+JOHVMxNrza2eloz3xrtnfG2aurqxfn889LItfztjlv/AFeMPHE0mZqSZT9m+pKPqR+7laS6n16n7qTMzPqkj6kL8ezMOItGNFMfpyyz4zfih7bjPhB87Y5c/ow8cv8An9nfxaM/VuH/AJEf8fidtPHwh3dxm80byV3LyO0NqHLeNejIWObZ3JrTWV1Y47c59EvqqvzzMKjFJFnUu2NvaQDmVSLb8IxYkyJNVYuodgpKKiS28nTE9nUU0VVRX1urGuUxOs6W5xlMabJZpxbzbxvEem2yYdyBwLHtp6J3JrPLILNjjOf6rz3Dr6vkNk4xIqshxa0rJrS0epJP2Epak+quhtpMj7iSY5lFu0otlF5j/lETs9I7k9Wk8p8lOF1M+pn6qMzNSiPqS1mZmtaT/wA1azUtJfUlRF9Q9NTpHKPJQbS/BPwPH9k+KjwtxnKILVlVR9pzMw+SPtkpldlrvCsqz/HFLb/x6ouQ4zCnJUf5HsCT8C9YOlflsf8A18ob0azy9YWY3Lndk3jVxf5C8gaygjZTZ6X03sPZlZjk2bIr4NzY4fjNjdQ6+bNisPyI0KVKiMx5klppa4sI3VJW33GZcDDp600U77Qt1T1YmUK/52zy4P1LjDxz6H6l3T9mmfr/ALSyxJKL/NWSUEsuiibb69iet9W0ZXxurMxE9WbXi8X98ZxwQTjc+6I9cz52xy5/Rh45f8/s7+LQ+rcP/Ij/AI/E7aePhDkvNr8tzUjv4wcdDI1F1NFlspPVCTJS0dXcpI0rLoXtCI3GvYPE8p1CmFRnsT7Nw7Vfa63Vj72W2LxbXS9strEY32p9/hGsR5xu5pxmls/c2xpzU+0nKwqVzZOtMF2AqoTKXPRUO5hi1VkKqpMx1mO7P/B/4SOKmYuPHXL9gT6mWjcNtPIqth9pEZWqiIvu+znfw8VimYqi8beN+HdyVSPiX4Fj+sPEI5o4JikFmqxnH+Sm3maGpitm1EqKqZmdtZQqiE2ZmaINUxNRXwiMzP5LGZPqPR9Hq62BhTvoj3ZeilVrPOfNg+JmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASv/KTfnfcnvs3Q/vPxEcv2n9yj/bylPga1co826bzSH0Y8f7SOpv3Hn4g9n/mqOVXk2x9Kec+SAxxa43bJ5fcgtXcbdRRa+RsHa2QLo6N64kuQaapiQqywvslyG4lMQZspNRjWM1NpkFuuNFnPx6uulFDiyLGVEjL7OLidjROJ/5V+6qd2uUaIKaetNm8nxEfLibf4N8aLjkvim/cb33Q6+Zq5u3MZZ11K17b4rV2E2NT/h7E1SsxzGLmFNUWNlFZtSsE0Vuiu7rZyNLYjzIMOlg+0KMfE6kxEVT7+7PZ4pK8Lqxe/wA+ENMvBD8+Dhp6mZlys48Eaj6kpRltrEyNSyUpa0uKMjNxC1G4hZqQ576VELmNERh1206s2744IqdY5x5rcrN/6GZh+q19+6po81h/iUfun+cL1Wk8p8lMQPT06RyjyUG3/wAA/wClx4cfrPsf7kNoCv078ni848kmF9+O7zhYSeKt9Gpzu+ylvL7vb0cPo/48c4/jK3VpPKfJU21FTZ5Db1eP0sKRaW95PhU9VWRUJVKsbOykpiQq+E043IbelSX3W2SJ5n5OaZCWjI1qMz9NVVTTE1V3tTTGW+OrG7Z886ER1pt3T4X8kqPLPKl8l8f42ztl1vITB8k5B1uJu5PYcfK7B7BijnTo0A7iZh+P7beys1WWXdWV1ta5MwCqo7G0kMQnMgr6xpN4vmx7RwprimIm0zMXnfE2nS8WnO08NEs4HVi+UTyjjHzaZ5Ipivr+s+p93uqT73e13dErQ2tBd3X3HCU4n8lbryyN1fSi16LadnVMd+aGdaefpK4O4bfmg8VPs3aN+7DFx5nE/ExP31fyleo0nn6QrB/F1+k55z/aR2V++3h3eifl8L9vrKnVrPOfNroFhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEr/yk3533J77N0P7z8RHL9p/co/28pT4GtXKPNum80h9GPH+0jqb9x5+IPZ/5qjlV5NsfSnnPkgbcM+U+ccJ+Tmo+UOuoFZcZVqe/l2bVFcOLZq8go7yit8UyvHpzzSXXYjOQ4te3lOizY7JVdJksTUMuuw4SZPXxMPtqcTD31VX8Zm8crxs12IKaurN0gzxLvMks8yuKWVcZ9Mcfb7VCtswK6p2lmGa5fX5BKrMeg2EO4tcWwqBTVMBEuRbu1zEOzyK5er3IVC5YRo+Ps2llGtKGj0f2f2NXWnfM3tt9+evKMt8zJXi9aLW+fGWgTgh+fDw1L06lyu48kfQ0qLqW28TIzI0GZGRmXUjM1L6H/dFKX3Gd7Gzw6/2z7osip1jnHmtys3/AKGZh+q19+6po83h/iUfun+cL1Wk8p8lMQPT06RyjyUG3/wD/pceHH6z7H+5DaAr9O/J4vOPJJhffju84WEnirfRqc7vspby+729HD6P+PHOP4yt1aTynyVOuOZBb4lkFDldBMcrr7Gbuqv6Sxb9n311pTS0T66eg5CFtqcYsWor0ZpaVRScjPk6lZyXWnfS1ReJp/VTET30xChE9Wb98+FvJMRyzzZlzb8cp1BjHGGXj3KKzxVzHVZkrMmJGqMfyeTAOG9ntVQyKpWWylx5BLuKrCrRDbUSYuLWy8oumGZcmRy59nTGLEz9yKr7LTE2mY84nLv3z9vem1s7Tnlnnvy5aShqmZqIlGZKNREruJSlErqpo+7vWRLcNXXuU6oiN1Rm4ZF3dC6sWvRbTs6ojuyQVTeYnfP/AMyuD+G35oPFT7N2jfuwxceZxPxMT99X8pXaNJ5+kKwfxdfpOec/2kdlfvt4d3on5fC/b6yp1azznza6BYYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABKV8p7l1NUc4t74lPltRrfL+M1q7j7LzpM/hF/Htj4FMsYEX1I3Jx18l2wT2dVFCrJzp+7EUYoe0vwsLhVPqnwNauUeaU/4z3BXbHiF8L39B6Uu8Ho86i7SwPPK9ewbC2psZnQMdav660r1WVFTZDLiSFwb1UuMT9POhS2onyB1LJyTko53RsWnCxZqq0tEZbMqZ566xG3ZbOJsSnrUzHf8+aI581d8Ss/X8b+Kauvqai2jnaSUZ/lK7V6fM09x9T7SUpCeva0tTZIUfR+sej8VaMGqIyiLbLzbzPmrniWf63cVP2pZz/Y+H1j0ffLPY18PF33xV8s34gGpuTvHjaudZtxpjYbq/desNkZQuh2Dm1rfLosGzehyq0j0de5qypbnXUyDSSIVdElXNRAXIkte2s4LSpsltie0cGcKaaL9aqJjPnblpo2owsSmq9/fGXzrPlqnA7ry6j1/pnbOeZFLZgY5hWtM6yy9mvmaWYdNjmL2t1ZSFJV07fk0OG86SehGRJLp1MiIcfDv2lF7znPvqif++F1ib2m+tpv4KbL6iPqR9UpPqR9xH1SR9Un9aT/q/wC70HpqdI5R5KDa14HmXUuFeK3wtucgmtQIMrZltikZ95fRpVznmv8AMsEx+OZfU5MyHJqmuR/lenxRB0r8tj/6+UN6NZ5esLKXmZpbIuR3E/kloLE7Gnpcp3HpLZGuMXtr9yUzQ197l2J2NJVSbqRXw7KxjUzFjLivTpVdXzZjMVLi2K+S+iPHl8DBmmK6Kq4+zRaZnXZEzl4LlUdam3D1n05+iCgXlW/ErIuhZdxV7S9Eme0c6JRkXwUru06lRqUXQ1GtJLNRmauqjMz7M+0ej7JnSI8IiFXsa9kRbnDn5q54ln+t3FT9qWc/2PjH1j0ffJ2NfDxeSfKueJSam+/L+KSEm6gjUvaOwDQSUmlSVKNnUDa2zJRGSXWUvPpM/Zdzjcj2cR9YYVq7XmKoi2V+HplHiRg4kTs35bMven5aL1/O1PpHTmrbOwh2djrXVWvdf2NnBbeZr7CdhmJ0uOSp8FElJSWost+udfiNyE+3Sy42l4icJXXi4kxPaTG2uJjfabbPPdsWaYmmLTrv36ZqqjxQctpM58RbmzlGNy2p9HYcmNus1s+O4TsadHq8xtKj5bEcL0VClLgLfhmXp8lcZIvQh6Po34GF+2NdVKrWec+bBETMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA7v438iNp8UN3675CaVvCx7ZGsLtN9QzZLb0itlpdYkVd1R3UBMuOqzxzJaKwm4/ktbHVGcm00+UxGlplLW7CxXhUYtFUTrab8t8f36tqaurN08TjX5o7ghsLCKpzkbV7E487JjQ47GTV7OIXGyMBl2aW+2RKxO7wpm5yVFY+6RPtRsoxSnm163F15v2rcZFtM4tXQMSmqYoi9F5tOXPlM3vE6RthYjGptne/L+2TPzj7wji9D5C5X1+vrordZ9T+s+p4ERmRn6kfQiMuhkRF0Ia/QukfpjxZ7ajj4Hzj7wjf0hcq/YVur+Aw+hdI/THj/AEdtRx8HryvMieEnHZdeZ37l8xbbRrTEjaO3EmS8ZGfRLRysOixm3FK91KpDjLPXt9o+hJ9xPoXSP0x4nbUcfBHM8YjzCxczta3nF3iZimX690nlS4zOz9h5scCqz3Y1TFeKWnEKaio7C2jYjiE2wisu3M6Vdy7vLYjUakdYxuqdyGsyC30boVWHMYlcWmde7KIic9kIsTFiqJiNOMcEW8/ifT4fUXr0IvqJBG6+SWy+DaUurQlHalBkgkkXSnP3e6LIXv1Fva49bVl/RWE6ovKOwh3NNa1cp6FaVlrWSWJtXYV0iKtDjM6NPjtPVr61JUiayfs1IU2080mmmqKqa72qjXdHds+eSJ6s3758LeSc7wL80ppO311juE89Mcy/CtpUECHVWG39fYurK8Gz9uEwbBZFe4tVSSyfD8nnkhldrW0NRkuPzbNU6zr/AMVYUqNi1RyMT2dXEzODF6Zm8RPHXSN/u3WWacamYi8zfhnGu+Gx5PmP/COMi68hMqI+nqX8he6DMjL0MlduCKSSiPqSyIzJKiMvqEMdB6RtpieN7ejbtqOPg5+cfeEb+kLlX7Ct1fwGH0LpH6Y8f6O2o4+Dg/MgeEeXXpyFyn16l66L3an3unUvX8QT6mr4JNtK2yP/AAjiD7iS+hY/6Y8TtqOPg1Q+I15oPXFtrLKNV+H/AEObv5vllRPpJW/s8qEYhV4PAnMNxpVnr7GVyZuS3GXtRpEhVZa5FGxmFjc5EW2jVOTqQlMex0foGJ1uviZRTnaL7JjWcvDbvR148TemPCeV9L+kaaoSi1uOLW48t1x1xRuOOvmpTzq1n3KdeWpbq3HXDM1uOrcWt1alOKUalGOrHVt9nTSO7+0DxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH06Wmt8jt6rH8eq7G8v7yzg09FR1EGTbW1tdWUyLCq62rrK6HIs58+0nSY1dEroTL8ubLfjtQ1OyHENRdbUx166/u0x6e++fhvZvMxEbtnGfXNJ741+Vb5fbXwqqzHem3td8bpl5EYsoWCP0NjtHPKliW0Skx8siVV3j2NU1olJpddi12V3L7KHENWSYVomXAjUKvaODFUxTgzVETaKs87fDTuS04MzETac88phkuXlDM36F/f14qfoRdf5vlv6kXoRn/AOb6fUyLqfp8evqr8o9frSIyp6PFtl5i/vtOrbsOPv8A6c/NDM3/AE6sV/6fbf8AthD60n/Hjxj4nYcff/T8JPlDs9Qw+qLznw9+Slo1Mx5OhLqGwpxPVSPay2tsznmWlKIiW61GWaC6n7B00+8+s8Oc6ujzfbb+rxox2PPxj4NFHiJeERy48NmZVW24aSizPU+TWR1GNbn1xJl2uCzbp2PJmFjl+i2r6m2xLJ36+O7Ig19/BjQLlFfYuUtxbN19i7XWujdKwekTVEUzRVEaZ/Z/7i0+XDSvD6ufwvs2x3NW/wAeh9TPqRGZqMzMzMiMz6GRdvU+pkhPVDZGSEKUhKVHZRxn7/dNndvG7j1svldvTWXHbT9dEstj7WyVvG8aRYykV9ZX9Ykizt8iupqWn342O4zR1dnf3lgzCtJcKurZjlfVWtg3DgLxViUYNFVc62m/d/XPuu2pp602Su2vKFZidbXPu87caatXYrTlrWtcebVyrhS3EEb0avtpG40TbKIwszaYkyKWldebSlSoMUz9knmR7Vi32cGKovNqpmImc52X2adybsePfePhf3PAvKGZv0/PqxX/AKfLgv8A7biUfp8PU/X4kRF6Fn60n/Hjxj4nYcff/Tpnf3lR+QutNV5fnWo+SmE7tzHFKebkEfWT2trPXttlcSpjrmz6nFr5zMMtifjLJjspbpIdo3WV8+wUivl20BEliSxtT7SoqqpiqjqzVrEaRnbW+2IvpbPnbWrAtHWyvv8Adujlt5In5H7pdCI/iSSR3rIiLuUpLKUmbpJik20aG2iRIfSRR0obbSltPRmY6sW0iLx3xebZcbIUlbin5ZjlJyY4v4pyJsdz601LebMw+vzrWGssmo7u4k2mM30Bq1xidmWT06Wo2HqyOE7Bt6yJW0marr6qwguWaI1umZBaoYvtGijE6kxeZmIvflHu2xlbxtNGFeiK7znE+6Zj0ndwR4dma5zLT+xc61RsSlexvPda5dkWCZlQSHW5DtPk2KW0ukuq45TCnI0xESwhPstTYjjkKa0lEqE45FeZWq7RVFdMVU6VReO/570UxaZjc/iBswAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACSH5XvQ+IbY8Qu+2Bl9XHuT4/wClck2FhsSWhEhmJsC4yPF8HpbpUdR+yWdRRZLlcqF7dJnEuCrbOH2TosZ1FH2jX1MGn/ymY4xns56cL34xLha99Pqm/c/udGqvDv4/yuQ+4aDOsoxdnL8bwmFRa7hVMzI7G+yZFg5GSgr++xyqahR4NbZTJEmVatkgoyWozTs5cVJ8jBw6sWYpp1m878pn0us1T1YmWjdHm0OESU9D47cqyPqo/Ss1F/WUai/K2m0o/Q/yjR735RKcIycVc+rcadYi/KJ5ZzO5F20cPCXl87R4Q/o7cq//AIzUH9qwfVmLuj/1j4nbRw8JdlaU8z5wu3jubVemqzSnJjGbTbOwsP1vT395T6ycpKm6za9g45TzrpNVsewsTpo9nPinYOVkSxnNsOrNqrnKJLDms+zsaIrmq0UxF9N0ROkcb7djanGiZtfbsvHu3x47m7TmnobD+TfE3kBo3OauNaUewNX5dWNfKWTkKqshh1Ui1xHJ4RflN22KZPBqMkqFK9W7Wsims1GSjVVwa4w8TDmMr1btkTMTfTdv9Yb1UxNNXGM892yPW29UDdDIzJR9ykmaVK69TUpJmSlGf+VSiNSi+ozMvqHpb3tO+KfKFG1rxxn3zLcR4Ast6F4uvDl6OrscXf7WhL+HvMz9CbUhSC/5aS8X/wCfEVunfk8XnHk3w4vVbfFvfCyt5FbroOOGh9wb+yqrurrGtN66y3ZV5U441XvX9tU4lTSruZXUjdpOr69VrLaiKZgpny4sZUhSUuOJSZrHBimqqqmmnOaptbnfl65eC3VPViZRxE+bQ4QkXT+bxyrV0NXvFW6gUSveP1Iy2v0Mj+o0+4ZeqCJHQivz7MxtsRe0TpE6xzRdtHDwl0zv7zZGlpuqswr+N3Hbccfb1rS2NZiF5teRg9LhuL286I5FiZNYsYtluVWeQIoFvJsyom2qtFk81HiOWsEnVSG9qPZ1cVUzXH2YnlHGLXnX4sTjXi1tmttfnTO6DWrr3LV3EakkZkp32LREpvqlSlLdP2yVL7yJaUElxxC1LUhtajQnrxMRExGlURHhEUzt0170EzeZnemQcOfNGYRpHiRr/T+5uOuwM23Fp7X9HrfFbjDMgx6twvYFZh1OxR4tYZbKvCRkWGWZ1USBCv3K6hzhidYR5dnDZS9LOrh8rE9nVV4s1TlReKr7r2v8NPglpxOrRFMa5885me73ztROt+bmyvkVu7bW+c5TBby/cOw8t2NkMeraNiqh2eW3cy6kV9S0bjy26muVLKDVpefkSPkEeP8AKJEh/wBo8vpUUU0UU0U/dpi0d39opnrTeNvpk6kGzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJX/lJvzvuT32bof3n4iOX7T+5R/t5SnwNauUebdN5pD6MeP9pHU37jz8Qez/AM1Ryq8m2PpTznyVzQ7e2r91X8pVgBlbwQ/Ph4afat48fe1iYjxfwq/2yzTrHOPNblZv/QzMP1Wvv3VNHm8P8Sj90/zheq0nlPkpiB6enSOUeSg2/wDgH/S48OP1n2P9yG0BX6d+TxeceSTC+/Hd5wsJPFW+jU53fZS3l93t6OH0f8eOcfxlbq0nlPkqWzI1dUJIzWpPu9iEOK7z7ktKShaiS7JaX/g23D9mlt72q+jaXEP+mqva8/dpiJjwiZ3beM8bKDe3rDy43ik7PwbHM9a1bgmDw8mro1zXY5sTZFLjuXxq+yZ9vBdtqFpnIJFJOXGW0+5UXyYFtXpdREsK6qmtPVsWlX0/ApqmmZm9No8IjT5mUlOHVVETFrTx3TZ/f/NhvFKLoX4u6N+BfDcED49C6mf/AIKkupn+V0Ik93XtIk9Bp9Y9H3yz2NfDxfnaeWL8Uivxq8vWMb0dcWdRFckQ8PrtuwiyPJltoNxqDTP2dJWYozLNaVFEcvsopmCedcbkO+xcZWzt9YdH+znP2uHG3h63Jwa4i+W3Ldbz923NoDyPHL/D8hvsRyyltsbynFbq1xvJsdvoMurvaDIaOc/V3VLdVc5tqbWW1XZRZUGyrZTTUiBMYeiOtNLZNCbkTTVETR92dPnmitMZTr829z4wyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlf8AlJvzvuT32bof3n4iOX7T+5R/t5SnwNauUebdN5pD6MeP9pHU37jz8Qez/wA1Ryq8m2PpTznyVzQ7e2r91X8pVgBlbwQ/Ph4afat48fe1iYjxfwq/2yzTrHOPNblZv/QzMP1Wvv3VNHm8P8Sj90/zheq0nlPkpiB6enSOUeSgzH8PrlFE4X8zeP3Jqzx+XlNLqzNXZ2RUFc81HtLDFsgpLLEsmKnXLlsQzumKO+sZNMiwUzUzLRiJEnvxWycnxI8airEw66KdZj07tk7453Zonq1X4+kesbEvzxSPME8ENp8Fdvaf4z5lk219q8g9e2utzpJmvM3wmu11T5hGVX5VaZrbZlS49VvvwMdctotTDxSbki5F4utcXJbqVSbWPy+jdCx4r61eVNM+Ouca5ceExosV4kVUZaTeP+r+/KNNqDJg+VPYNmuHZtGhQ7KRh2UY/lUestmiXVzncdtWLqPWWjBPM98OS7E+TSW2JK5bjDq0d3snJI69cdemqN8W8MvSyveKerO/3zeY8lkxqzzHfhUZ1geOZNme97vT+V2VbFfyDXOYak3He32KW6mCTOqpF5guv8qxO4KK+TiWbKkvJsaXGNp5ZRZC34cfh19Bx6a6oowevTe8Vb4nO3dM2nllZajGotneZy32+bcph/f/ADgzwgepdvMOAoldEl00jyOI1LIu8iJX8jxl3JSlbnszbW50MnO5KDGs9B6VNN+zmmmM+rExFs+MxPHTZnna+3a0TneI4TrDbth2W49sLEcWzvEbBNxieb49R5bjFumNMhptMfyKtj3VLYFDsIcOwhFLrZcSc01Oix5bC3/ZSGWXkqQIaomJtOsZe+f+uUM0zE3mJvEzr3QqpfF6dad8TvnItmJEhI/nFbBR7GFG+SsrW1Zm07KW0fqcuc6hc6e//wCqnSJEr/HDv9F/Aw+U/wApUqtZ5z5tcgnYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABKy8pZYQ2+ZvJKrcfQmfN4xqmR4xH770Ks2ngjUuSf1dIr9vEaL4ek0j+HofM9pfcp5SnwNauUeaQ15hnjru/k94e8rXugdbZHtPOK7detssfxXEorc7ITx+BCymqsLGDAN1iVYHCl3Vd8qi1i3ZjEF1+wfQqsjTCTT6HiU0Y0zXlFtdmdsvH4RqkxY61NucfDuyzQTz8IbxOzPqXBnkZ0Poroeurb3e4u40F2Ntl2oM+1PuErtIu9S19y1dmOldH2Y8UR+mJi0eO/XvQU4dcRERM22a7+EOP+yG8Tz9BnkX+zq4D6Vgf5PvhnqYm+f+XwZM8KvCg8R/GuY3FPJ8o4bbzxjGcV5G6RyjJciyTDXKXHqTHMc2XjN7e29pZ2n/dYsSpq62XOluPeshCGI0IvwkmIIcbpOBVRVFNUV1Wn7V85ymdm6Itbhnwx2eJFVM7Lxz8Zz7tyy02JPiVWu87tJ8hMWDW4ZlNhMluGZtRYsOlmyn5LvcXVPsGm1PdOhdpF2pMyIjLiU/iUWyz/APqlbn7s31ts5KZYjIyI09O1REpHb+T2GXVPb/ukkyIv9nQemp0jlHkoP1aadedaZYaW++6pKGmWUPLccW482hKTTFL5T75kaW1sofV7co8ci6yCSW1UzTTeb9XZ4/G+voNgVN4TfiXX9VAuqzg5yWXX2cVqXCXM1XklVIXGdT1aU5X2EODLi9yOikIcitpNBpWyp1hTbzkH0nBjKcfqzGtOWSSmiuYiYvbZrv4Q+oXhC+J4X/sZ5GH/AMddXHUPpWB/k++Gepib5/5fB1jtvw7Od2iMNsdh7e4k76wHBqg2/wAMZff64yiNjVG26okNP3txHhTYFNFkSVR4keba+xhvT348VSuqepo6RgVT1aa4qq/VtmP6vEZboaThzEzVOc7dbxlx+e5hmZESS6GRp6e6ZJSkjSamjSZJQZtkRp6GXs+jfT/BpSjtSU+2n9lbSdaefpK4P4bfmg8VPs3aN+7DFx5nE/ExP31fyleo0nn6QrB/F1+k55z/AGkdlfvt4d3on5fC/b6yp1azznza6BYYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmz4efNnN/D85Va75KYZARkEfG3J9DnmGPSjr4uca3yNpmPlGMP2HsJSq6S+0wzbUtmqLNiQMipaacuvnlBlwpUPSMGMXC6sfez88tmvfsbU1dWbrJjjV4vHh5co8LqMswnk/qvELWxiMPWWvNu5ljurNj47NcZNyTWTMZzG1grtV17yHGX7TFZN9jjpkh6FbS4zrT7nCxOi4uHNuymrPW2U3vN72vbZzyutU4tMxEzMRO7v72UCeYfEfoX99Pxz9S6+m79ZdDJXqR+uTevUj69fQj+JERdCKOKK7fh1U65WnLP5nzbxMTF4m8Ttc/zw+I/wClPxz/AG36x/iYZ6lf6av/AFn4MvSm8z+HlfHfmWHLHjXChRkE5Ily966uixY7SepqdkyHMqbQy2XRRG46tDX9UyUroSsTh4k5djVVG/qznsta07d0TLWaoiZjPJGk8bfx79CJ0PsPiZwr2BX7b2DtqhssG2RtzEVPStfYFgOQw5MDKKjGMnSmJBzLMsnqXV0KJGKvWFRjlTbzrFN1+M0eFXs3+idDrmqK66YpppvPU3TEzN84ytlMW2zbLbDi4kTE0x/fznO+dNEFY/VSjMuhmpR9O4l9OpmfQlEpZKSXwSfX1T0PtR+SnszNM/dyjSO7Lz+ZVoy8Z98zLOPw0dv6h0Fzz4tbj31CbmanwLatVc5W89WOXDdCXyaTFpMyKtaYmzp34iZDKrM1XHqociaTGPyFRIM2Y4ll6DpFNVWFXFOtvD103ZpMOerVE93zz0WjNJzd4ZZFUV97R8teNVlUWsVqdXTom89ZOx5USQn2jLyFHkpKI1JP323EpcacJbTqUuIUkvPRh4kZVU1TVebzaZ2zMbN1l2J62e/fwyfV/nh8R/0p+Of7b9Y/xMM9Sv8ATV/6z8Bjryn8RLw/tT6L2dku1OQ+hM4xFWF5JX2Ot6HZOD5rk2ymrOml16sEosPorS3sryVlSH3KZ5tcB2sYhvyZN4uLSR58+Lvh4OJXi0Wpn7M7YnLxtlyz8WtVVMRVEznEcd1/L52TU8eijUXaTZGTnaSzN9DZGS1IYUSnHVOqQtCSkdy+9xhCXlJQpg0J9HMVRTNM61Uxe/7YiLabtqjeJzp0vNvH5us9eAHiq8Dso4G6My3JuTWm9b2WsNJ6/wAQ2lhGxNgY1i2ZYflGB4fVUOQxSxW2sGb++gTLCpkOYpYUlbYJyWO5EKu9tZuzIkfz+P0fEjHmIiZzvTa9pvETrMzaYvnMzabZW0XaaqIpmJttvePnPTflstGdd1zv3Xi/I/mdyg3rhDc1vDNpbu2Fl+InZx1xLKRjFnkU1VBOsIbiUrhTrCqTEnTISyNUORIcjGtz2XtFdvApmjCopnWImMtNZmPcp1TEzMxpdicJWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k=";
    axios({
      method: "PUT",
      url: `https://api.spotify.com/v1/playlists/${playlistID}/images`,
      data: data,
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "image/jpeg",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
        connectionTimeout();
      });
  }

  const _openSpotify = (playlistID) => {
    try {
      Linking.openURL("spotify:playlist:" + playlistID).catch((err) => {
        WebBrowser.openBrowserAsync(
          encodeURI("https://open.spotify.com/playlist/" + playlistID)
        );
      });
    } catch (err) {
      WebBrowser.openBrowserAsync(
        encodeURI("https://open.spotify.com/playlist/" + playlistID)
      );
    }
  };

  function addSongs(playlistID, accessToken) {
    let songs = "";
    for (let i = 0; i < tracks.length; i++) {
      songs = songs + tracks[i].replace(/:/g, "%3A") + "%2C";
    }
    //console.log(songs);

    axios({
      method: "POST",
      url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks?uris=${songs}`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        //console.log(res)
        navigation.replace("Home");
        _openSpotify(playlistID);
        //createPlaylist(res.data.id, tokenValue.access_token)
      })
      .catch((err) => {
        console.log(err);
        connectionTimeout();
      });
  }

  function getSongs(playlistID, accessToken) {
    let songs = "";

    axios({
      method: "GET",
      url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        console.log("TRACKS TO BE ADDED:");
        console.log(tracks);

        console.log("CURRENT TRACKS:");
        for (let i = 0; i < res.data.items.length; i++) {
          console.log(res.data.items[i].track.uri);

          if (tracks.includes(res.data.items[i].track.uri)) {
            tracks = tracks.filter((e) => e !== res.data.items[i].track.uri);
          }
        }
        if (!tracks.length == 0)
          // add songs to playlist
          addSongs(playlistID, accessToken);
        else {
          navigation.replace("Home");
          _openSpotify(playlistID);
        }
      })
      .catch((err) => {
        console.log(err);
        connectionTimeout();
      });
  }
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#282B33",
        }}
      >
        <ScanningIcon style={{ stroke: "white" }} stroke="white" home={false}>
          <Animated.View style={[styles.line, reanimatedStyle]}></Animated.View>
        </ScanningIcon>
        <Text style={styles.text}>GENERATING PLAYLIST...</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  line: {
    backgroundColor: "white",
    width: 70,
    height: 4,
    position: "relative",
    top: 15,
    alignSelf: "center",
  },
  text: {
    fontSize: 20,
    color: "white",
    position: "relative",
    bottom: 200,
  },
});

export default GenerateScreen;
