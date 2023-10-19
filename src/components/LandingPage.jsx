import { useState, useEffect } from 'react';
const LandingPage = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const [videoDetails, setVideoDetails] = useState(null);
    const [channelDetails, setChannelDetails] = useState(null);
    const [otherVideoDetails, setOtherVideoDetails] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

  const getVideoIdFromUrl = (url) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  const loadGapiScript = () => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      window.gapi.load('client', () => {
        console.log('Client library loaded');
      });
    };
    document.head.appendChild(script);
  };

  useEffect(() => {
    loadGapiScript();
  }, []);


//   const getVideoDetails = () => {
//     const apiKey = 'AIzaSyDQLHqF04ULd6oeahV2-Yd0Bj2pq85TX5c'; // Replace with your API key
//     const videoId = getVideoIdFromUrl(videoUrl);

//     if (!videoId) {
//       setError('Invalid YouTube URL');
//       return;
//     }

//     setError(null);

//     window.gapi.client.init({
//       apiKey: apiKey,
//     }).then(() => {
//       return window.gapi.client.request({
//         path: 'https://www.googleapis.com/youtube/v3/videos',
//         params: {
//           part: 'snippet,statistics',
//           id: videoId,
//         },
//       });
//     }).then(response => {
//       const details = response.result.items[0];
//       console.log("deathtails: ", response.result);
//       updateVideoDetails(details);
//       // console.log(details.snippet.channelId);
//       console.log("Title:", details.snippet.title);
//       console.log("Views:", details.statistics.viewCount);
//       console.log("Comments:", details.statistics.commentCount);
//       fetchChannelDetails(details.snippet.channelId);
//       fetchOtherVideosFromChannel(details.snippet.channelId)
//       // console.log("Title:", details.statistics.title);
//       // console.log(videoDetails);
//     }).catch(error => {
//       console.error('Error fetching video details:', error);
//       setError('Error fetching video details');
//     });
//   };

//   const fetchChannelDetails = (channelId) => {
//     const apiKey = 'AIzaSyDQLHqF04ULd6oeahV2-Yd0Bj2pq85TX5c'; // Replace with your API key

//     window.gapi.client.init({
//       apiKey: apiKey,
//     }).then(() => {
//       return window.gapi.client.request({
//         path: 'https://www.googleapis.com/youtube/v3/channels',
//         params: {
//           part: 'snippet,statistics',
//           id: channelId,
//         },
//       });
//     }).then(response => {
//       const channelDetails = response.result.items[0];
//       // setChannelDetails(channelDetails);
//       console.log(channelDetails);
//     }).catch(error => {
//       console.error('Error fetching channel details:', error);
//       setError('Error fetching channel details');
//     });
//   };

//   const fetchOtherVideosFromChannel = (channelId) => {
//     const apiKey = 'AIzaSyDQLHqF04ULd6oeahV2-Yd0Bj2pq85TX5c'; // Replace with your API key

//     if (!channelId) {
//       setError('Invalid channel ID');
//       return;
//     }

//     window.gapi.client.init({
//       apiKey: apiKey,
//     }).then(() => {
//       return window.gapi.client.request({
//         path: 'https://www.googleapis.com/youtube/v3/search',
//         params: {
//           part: 'snippet',
//           channelId: channelId,
//           order: 'date',
//           type: 'video',
//           maxResults: 5, // You can adjust the number of videos to fetch
//         },
//       });
//     }).then(response => {
//       const otherVideos = response.result.items;
//       // You can now use otherVideos to display details of other videos from the channel
//       console.log('Other videos from the same channel:', otherVideos);
//     }).catch(error => {
//       console.error('Error fetching other videos:', error);
//       setError('Error fetching other videos');
//     });
//   };

const fetchAllDetails = () => {
    const apiKey = 'AIzaSyDQLHqF04ULd6oeahV2-Yd0Bj2pq85TX5c'; // Replace with your API key
    const videoId = getVideoIdFromUrl(videoUrl);
  
    if (!videoId) {
      setError('Invalid YouTube URL');
      return;
    }
  
    setError(null);
  
    window.gapi.client.init({
      apiKey: apiKey,
    }).then(() => {
      // Fetch video details
      return window.gapi.client.request({
        path: 'https://www.googleapis.com/youtube/v3/videos',
        params: {
          part: 'snippet,statistics',
          id: videoId,
        },
      });
    }).then(response => {
      const videoDetails = response.result.items[0];
      console.log('Video Details:', videoDetails);
        setVideoDetails(videoDetails);
      // Extract channelId from video details
      const channelId = videoDetails.snippet.channelId;
  
      // Fetch channel details
      return window.gapi.client.request({
        path: 'https://www.googleapis.com/youtube/v3/channels',
        params: {
          part: 'snippet,statistics',
          id: channelId,
        },
      });
    }).then(response => {
      const channelDetails = response.result.items[0];
      console.log('Channel Details:', channelDetails);
        setChannelDetails(channelDetails)
      // Fetch other videos from the same channel
      return window.gapi.client.request({
        path: 'https://www.googleapis.com/youtube/v3/search',
        params: {
          part: 'snippet',
          channelId: channelDetails.id,
          order: 'date',
          type: 'video',
          maxResults: 5,
        },
      });
    }).then(response => {
      const otherVideos = response.result.items;
      console.log('Other Videos:', otherVideos);
  
      // Fetch details for each other video
      const fetchOtherVideoDetailsPromises = otherVideos.map(video => {
        return window.gapi.client.request({
          path: 'https://www.googleapis.com/youtube/v3/videos',
          params: {
            part: 'snippet,statistics',
            id: video.id.videoId,
          },
        });
      });
  
      return Promise.all(fetchOtherVideoDetailsPromises);
    }).then(otherVideosDetails => {
      console.log('Details of Other Videos:', otherVideosDetails);
      setOtherVideoDetails(otherVideosDetails)
    }).catch(error => {
      console.error('Error fetching details:', error);
      setError('Error fetching details');
    });
  };

  const handleCheckEarning = async() => {
    setLoading(true);
    setTimeout(() => {
        try{
             fetchAllDetails();
        } catch(error){
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, 3000);
    
  }
    return ( 
        <main className='flex flex-col max-sm:justify-start  items-center w-full h-full relative'>
        <div className='bg-black text-white w-[741px] max-md:w-full space-y-[60px] absolute top-[134px] max-sm:top-[100px] h-fit'>
          <div className='flex flex-col items-center'>
            <p className='text-center z-10  font-bold text-5xl leading-[72px] w-4/5'>Discover your earning potential</p>
            <p className='text-center z-10  font-normal text-2xl leading-[36px]'>Turn your Youtube expertise into a lucrative income
              through resource sharing</p>
          </div>
          <div className='flex w-full justify-between items-center space-x-[20px] max-sm:flex-col max-sm:space-y-4'>
            <div className='w-full px-[39px] py-[12px] z-10  rounded-full border flex space-x-[10px] border-opacity-50 border-white'>
              <img width="24" height="30" src="https://img.icons8.com/ios-glyphs/30/EBEBEB/youtube-play.png" alt="youtube-play" />
              <input
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)} className='w-full bg-transparent outline-none text-xl placeholder:text-[#373737] placeholder:font-normal' placeholder='enter youtube video link' />
            </div>
            <button onClick={handleCheckEarning} className='bg-red-500 px-[24px] z-10  py-[18px] rounded-[35px] h-[48px] flex justify-center items-center w-48 hover:bg-opacity-90 text-base'>Check Earning</button>
          </div>
        </div>
        <div className='bg-[#323232] absolute bottom-0 -right-14 z-0 rounded-full w-[300px] h-[300px] flex justify-center items-center opacity-50 '>
          <img width="64" height="64" src="https://img.icons8.com/sf-black-filled/64/737373/play.png" alt="play" />
        </div>
        {loading && <div className='fixed inset-0 h-screen w-screen flex justify-center items-center bg-black bg-opacity-90 z-30'>
            <div className='text-white border-t-4 border-blue-500 rounded-full animate-spin h-16 w-16'></div>
        </div>}
      </main>
     );
}
 
export default LandingPage;