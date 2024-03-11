import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function FooterText() {
    return (
        <footer className="text-center text-gray-500 mt-4 text-m">
            <p> Made with <FontAwesomeIcon icon={faHeart} className="fa-shake text-red-500" /> by <a href="https://github.com/brayanquirozurrutia" target="_blank" className="hover:text-lg transition-all duration-200 ease-in-out">Brayan Quiroz</a></p>
            <p> &copy; 2024 API Solutions. All rights reserved. </p>
        </footer>
    );
}

export default FooterText;
