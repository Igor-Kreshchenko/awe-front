import PropTypes from 'prop-types';
import './SocialButton.scss';

const SocialButton = ({ onClick, label, icon }) => {
  return (
    <button className="social-button" onClick={ onClick }>
      <div>
        <img src={ icon } />
      </div>
      <span>{ label }</span>
    </button>
  );
};

SocialButton.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
  icon: PropTypes.string,
}

export default SocialButton;
