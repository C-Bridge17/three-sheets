import PropTypes from "prop-types";
import './error.css'

const Error = ({ embedId }) => {
  return (
    <>
      <div className="video-responsive">
        <h1>It seems like you are lost enjoy some LoFi</h1>
        <iframe
          width="500"
          height="500"
          src={`https://www.youtube.com/embed/${embedId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
    </>
  )
  Error.propTypes = {
    embedId: PropTypes.string.isRequired
  };
}
export default Error
