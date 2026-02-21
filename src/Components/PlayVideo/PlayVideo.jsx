import './PlayVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import React, { useState, useEffect } from 'react'
import { API_KEY, value_converter } from '../../data'
import moment from "moment";
import { useParams } from 'react-router-dom'

const PlayVideo = () => {
  const { videoId } = useParams();
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false); // ✅ NEW

  const fetchOtherData = async () => {
    if (!apiData) return;

    const channelData_url =
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`

    await fetch(channelData_url)
      .then(res => res.json())
      .then(data => setChannelData(data.items[0]))
  }

  const fetchVideoData = async () => {
    const videoDetails_url =
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`

    await fetch(videoDetails_url)
      .then(res => res.json())
      .then(data => setApiData(data.items[0]));

    const comment_url =
      `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`

    await fetch(comment_url)
      .then(res => res.json())
      .then(data => setCommentData(data.items || []));
  }

  useEffect(() => {
    fetchVideoData();
  }, [videoId])

  useEffect(() => {
    fetchOtherData();
  }, [apiData])

  return (
    <div className='play-video'>

      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allowFullScreen
      ></iframe>

      <h3>{apiData ? apiData.snippet.title : "Title here"}</h3>

      <div className="play-video-info">
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : "16k"} views •{" "}
          {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
        </p>

        <div>
          <span>
            <img src={like} alt="" />
            {apiData ? value_converter(apiData.statistics.likeCount) : 155}
          </span>

          <span>
            <img src={dislike} alt="" />5
          </span>

          <span>
            <img src={share} alt="" />share
          </span>

          <span>
            <img src={save} alt="" />save
          </span>
        </div>
      </div>

      <hr />

      <div className="publisher">
        <img
          src={channelData ? channelData.snippet.thumbnails.default.url : ""}
          alt=""
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
          <span>
            {channelData
              ? value_converter(channelData.statistics.subscriberCount)
              : ""} subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>

      <div className="vid-description">
        <p>
          {apiData
            ? apiData.snippet.description.slice(0, 250)
            : "Description Here"}
        </p>

        <hr />

        <h4>
          {apiData
            ? value_converter(apiData.statistics.commentCount)
            : 102} Comments
        </h4>

        {/* ✅ Show only 3 initially */}
        {(showAllComments ? commentData : commentData.slice(0, 3)).map((item, index) => {

          const comment = item.snippet.topLevelComment.snippet;

          return (
            <div key={index} className="comment">
              <img src={comment.authorProfileImageUrl} alt="" />

              <div>
                <h3>
                  {comment.authorDisplayName}
                  <span>{moment(comment.publishedAt).fromNow()}</span>
                </h3>

                {/* Safe HTML rendering */}
                <p dangerouslySetInnerHTML={{ __html: comment.textDisplay }}></p>

                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>{value_converter(comment.likeCount)}</span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          )
        })}

        {/* ✅ Toggle Button */}
        {commentData.length > 3 && (
          <div
            className="toggle-comments"
            onClick={() => setShowAllComments(!showAllComments)}
          >
            {showAllComments ? "Show less comments" : "Show more comments"}
          </div>
        )}

      </div>
    </div>
  )
}

export default PlayVideo
